import express from 'express';
import cors from 'cors';
import compression from 'compression';
import multer from 'multer';
import fs from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import sharp from 'sharp';

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
const eventsFile = join(dataDir, 'events.json');
const photosFile = join(dataDir, 'photos.json');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(activitiesFile)) fs.writeFileSync(activitiesFile, '[]');
if (!fs.existsSync(eventsFile)) fs.writeFileSync(eventsFile, '[]');
if (!fs.existsSync(photosFile)) fs.writeFileSync(photosFile, '[]');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

function autoCommit(file, message) {
  exec(`git add ${file} && git commit -m "${message}"`, (err, stdout, stderr) => {
    if (err) {
      console.error('Auto-commit failed:', stderr);
    } else {
      console.log('Auto-commit:', stdout);
    }
  });
}

// Helper to convert and save image as webp
async function saveAsWebp(file, destDir) {
  const webpFilename = `${Date.now()}-${file.originalname.split('.')[0]}.webp`;
  const webpPath = join(destDir, webpFilename);
  await sharp(file.path).webp({ quality: 80 }).toFile(webpPath);
  fs.unlinkSync(file.path); // Remove original upload
  return webpFilename;
}

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
app.post('/api/activities', upload.single('image'), async (req, res) => {
  const { title, description, displayOn } = req.body;
  let image = '';
  if (req.file) {
    try {
      const webpFilename = await saveAsWebp(req.file, uploadsDir);
      image = `/uploads/${webpFilename}`;
    } catch (err) {
      return res.status(500).json({ error: 'Failed to process image' });
    }
  }
  fs.readFile(activitiesFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read activities' });
    const activities = JSON.parse(data);
    const activity = { id: Date.now(), title, description, image, displayOn };
    activities.push(activity);
    fs.writeFile(activitiesFile, JSON.stringify(activities, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to save activity' });
      autoCommit(activitiesFile, 'Update activities.json via dashboard');
      res.json(activity);
    });
  });
});

// API: Update activity/event
app.put('/api/activities/:id', upload.single('image'), async (req, res) => {
  const id = Number(req.params.id);
  const { title, description, displayOn } = req.body;
  let image;
  if (req.file) {
    try {
      const webpFilename = await saveAsWebp(req.file, uploadsDir);
      image = `/uploads/${webpFilename}`;
    } catch (err) {
      return res.status(500).json({ error: 'Failed to process image' });
    }
  }
  fs.readFile(activitiesFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read activities' });
    let activities = JSON.parse(data);
    activities = activities.map(a => a.id === id ? { ...a, title, description, displayOn, image: image || a.image } : a);
    fs.writeFile(activitiesFile, JSON.stringify(activities, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to update activity' });
      autoCommit(activitiesFile, 'Update activities.json via dashboard');
      res.json(activities.find(a => a.id === id));
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
      autoCommit(activitiesFile, 'Update activities.json via dashboard');
      res.json({ success: true });
    });
  });
});

// API: List events
app.get('/api/events', (req, res) => {
  fs.readFile(eventsFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read events' });
    res.json(JSON.parse(data));
  });
});

// API: Add event
app.post('/api/events', upload.single('image'), (req, res) => {
  const { title, date, time, venue, description, displayOn } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  fs.readFile(eventsFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read events' });
    const events = JSON.parse(data);
    const event = { id: Date.now(), title, date, time, venue, description, image, displayOn };
    events.push(event);
    fs.writeFile(eventsFile, JSON.stringify(events, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to save event' });
      autoCommit(eventsFile, 'Update events.json via dashboard');
      res.json(event);
    });
  });
});

// API: Update event
app.put('/api/events/:id', upload.single('image'), (req, res) => {
  const id = Number(req.params.id);
  const { title, date, time, venue, description, displayOn } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  fs.readFile(eventsFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read events' });
    let events = JSON.parse(data);
    events = events.map(e => e.id === id ? { ...e, title, date, time, venue, description, displayOn, image: image || e.image } : e);
    fs.writeFile(eventsFile, JSON.stringify(events, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to update event' });
      autoCommit(eventsFile, 'Update events.json via dashboard');
      res.json(events.find(e => e.id === id));
    });
  });
});

// API: Delete event
app.delete('/api/events/:id', (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(eventsFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read events' });
    let events = JSON.parse(data);
    events = events.filter(e => e.id !== id);
    fs.writeFile(eventsFile, JSON.stringify(events, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to delete event' });
      autoCommit(eventsFile, 'Update events.json via dashboard');
      res.json({ success: true });
    });
  });
});

// API: List photos
app.get('/api/photos', (req, res) => {
  fs.readFile(photosFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read photos' });
    res.json(JSON.parse(data));
  });
});

// API: Add photo
app.post('/api/photos', upload.single('image'), async (req, res) => {
  const { category } = req.body;
  let image = '';
  if (req.file) {
    try {
      const webpFilename = await saveAsWebp(req.file, uploadsDir);
      image = `/uploads/${webpFilename}`;
    } catch (err) {
      return res.status(500).json({ error: 'Failed to process image' });
    }
  }
  fs.readFile(photosFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read photos' });
    const photos = JSON.parse(data);
    const photo = { id: Date.now(), image, category };
    photos.push(photo);
    fs.writeFile(photosFile, JSON.stringify(photos, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to save photo' });
      autoCommit(photosFile, 'Update photos.json via dashboard');
      res.json(photo);
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