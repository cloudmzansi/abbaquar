import React, { useEffect, useState, useRef } from 'react';

const ADMIN_EMAIL = 'andrewmichaelsrsa@gmail.com';

type Photo = { id: string; filename: string; description: string };
type Activity = { id: string; title: string; description: string; category: string };
type Event = { id: string; title: string; description: string; date: string; location: string };

const AdminPage = () => {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [activityForm, setActivityForm] = useState({ title: '', description: '', category: 'YOUTH' });
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', location: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auth
  const handleAuth = () => {
    if (email === ADMIN_EMAIL) setAuthed(true);
    else alert('Unauthorized');
  };

  // Fetch data
  useEffect(() => {
    if (!authed) return;
    fetch('/photos', { headers: { 'x-admin-email': ADMIN_EMAIL } })
      .then(res => res.json()).then(setPhotos);
    fetch('/activities', { headers: { 'x-admin-email': ADMIN_EMAIL } })
      .then(res => res.json()).then(setActivities);
    fetch('/events', { headers: { 'x-admin-email': ADMIN_EMAIL } })
      .then(res => res.json()).then(setEvents);
  }, [authed]);

  // Photo upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    await fetch('/photos/upload', {
      method: 'POST',
      headers: { 'x-admin-email': ADMIN_EMAIL },
      body: formData,
    });
    setFile(null);
    setDescription('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    // Refresh
    fetch('/photos', { headers: { 'x-admin-email': ADMIN_EMAIL } })
      .then(res => res.json()).then(setPhotos);
  };

  // Photo delete
  const handleDeletePhoto = async (filename: string) => {
    await fetch('/photos/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-email': ADMIN_EMAIL },
      body: JSON.stringify({ filename }),
    });
    setPhotos(photos.filter(p => p.filename !== filename));
  };

  // Activity CRUD
  const handleAddActivity = async () => {
    await fetch('/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-email': ADMIN_EMAIL },
      body: JSON.stringify(activityForm),
    });
    setActivityForm({ title: '', description: '', category: 'YOUTH' });
    fetch('/activities', { headers: { 'x-admin-email': ADMIN_EMAIL } })
      .then(res => res.json()).then(setActivities);
  };
  const handleDeleteActivity = async (id: string) => {
    await fetch(`/activities/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-email': ADMIN_EMAIL },
    });
    setActivities(activities.filter(a => a.id !== id));
  };

  // Event CRUD
  const handleAddEvent = async () => {
    await fetch('/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-email': ADMIN_EMAIL },
      body: JSON.stringify(eventForm),
    });
    setEventForm({ title: '', description: '', date: '', location: '' });
    fetch('/events', { headers: { 'x-admin-email': ADMIN_EMAIL } })
      .then(res => res.json()).then(setEvents);
  };
  const handleDeleteEvent = async (id: string) => {
    await fetch(`/events/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-email': ADMIN_EMAIL },
    });
    setEvents(events.filter(e => e.id !== id));
  };

  if (!authed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 mb-2"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleAuth}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {/* Photo Upload */}
      <form onSubmit={handleUpload} className="mb-6 flex flex-col gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Upload Photo</button>
      </form>
      {/* Photo List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Photos</h2>
        <div className="grid grid-cols-2 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="border p-2 flex flex-col items-center">
              <img src={`/assets/${photo.filename}`} alt={photo.description} className="w-32 h-32 object-cover mb-2" />
              <p>{photo.description}</p>
              <button
                className="mt-2 bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => handleDeletePhoto(photo.filename)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Activities */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Activities</h2>
        <div className="mb-2 flex gap-2">
          <input
            type="text"
            placeholder="Title"
            value={activityForm.title}
            onChange={e => setActivityForm(f => ({ ...f, title: e.target.value }))}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={activityForm.description}
            onChange={e => setActivityForm(f => ({ ...f, description: e.target.value }))}
            className="border p-2"
          />
          <select
            value={activityForm.category}
            onChange={e => setActivityForm(f => ({ ...f, category: e.target.value }))}
            className="border p-2"
          >
            <option value="YOUTH">Youth</option>
            <option value="COMMUNITY">Community</option>
            <option value="EDUCATION">Education</option>
            <option value="HEALTH">Health</option>
          </select>
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded"
            onClick={handleAddActivity}
            type="button"
          >
            Add
          </button>
        </div>
        <ul>
          {activities.map(a => (
            <li key={a.id} className="flex justify-between items-center border-b py-1">
              <span>{a.title} - {a.description} ({a.category})</span>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteActivity(a.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Events */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Events</h2>
        <div className="mb-2 flex gap-2">
          <input
            type="text"
            placeholder="Title"
            value={eventForm.title}
            onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={eventForm.description}
            onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))}
            className="border p-2"
          />
          <input
            type="date"
            value={eventForm.date}
            onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={eventForm.location}
            onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))}
            className="border p-2"
          />
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded"
            onClick={handleAddEvent}
            type="button"
          >
            Add
          </button>
        </div>
        <ul>
          {events.map(e => (
            <li key={e.id} className="flex justify-between items-center border-b py-1">
              <span>{e.title} - {e.description} ({e.date}, {e.location})</span>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteEvent(e.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage; 