import express from 'express';
import cors from 'cors';
import compression from 'compression';
import multer from 'multer';
import fs from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Enable compression
app.use(compression());

app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));
app.use('/uploads', express.static(join(__dirname, 'public/uploads')));

// Ensure uploads and data directories exist
const uploadsDir = join(__dirname, 'public/uploads');
const dataDir = join(__dirname, 'data');
const activitiesFile = join(dataDir, 'activities.json');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(activitiesFile)) fs.writeFileSync(activitiesFile, '[]');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// API: Upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// API: List images
app.get('/api/images', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to list images' });
    res.json(files.map(f => `/uploads/${f}`));
  });
});

// API: Delete image
app.delete('/api/delete', (req, res) => {
  const { filename } = req.body;
  if (!filename) return res.status(400).json({ error: 'No filename provided' });
  const filePath = join(uploadsDir, filename);
  fs.unlink(filePath, err => {
    if (err) return res.status(500).json({ error: 'Failed to delete image' });
    res.json({ success: true });
  });
});

// API: List activities/events
app.get('/api/activities', (req, res) => {
  fs.readFile(activitiesFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read activities' });
    res.json(JSON.parse(data));
  });
});

// API: Add activity/event
app.post('/api/activities', (req, res) => {
  const activity = req.body;
  fs.readFile(activitiesFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read activities' });
    const activities = JSON.parse(data);
    activity.id = Date.now();
    activities.push(activity);
    fs.writeFile(activitiesFile, JSON.stringify(activities, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to save activity' });
      res.json(activity);
    });
  });
});

// API: Update activity/event
app.put('/api/activities/:id', (req, res) => {
  const id = Number(req.params.id);
  const updated = req.body;
  fs.readFile(activitiesFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read activities' });
    let activities = JSON.parse(data);
    activities = activities.map(a => (a.id === id ? { ...a, ...updated } : a));
    fs.writeFile(activitiesFile, JSON.stringify(activities, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to update activity' });
      res.json(updated);
    });
  });
});

// API: Delete activity/event
app.delete('/api/activities/:id', (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(activitiesFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read activities' });
    let activities = JSON.parse(data);
    activities = activities.filter(a => a.id !== id);
    fs.writeFile(activitiesFile, JSON.stringify(activities, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to delete activity' });
      res.json({ success: true });
    });
  });
});

// Serve index.html for all routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 