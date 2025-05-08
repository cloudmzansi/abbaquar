import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../lib/auth';

interface Activity {
    id: number;
    title: string;
    description: string;
    image?: string;
    displayOn: 'home' | 'activities' | 'both';
}
interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    venue: string;
    description: string;
    image?: string;
    displayOn: 'home' | 'events' | 'both';
}
interface Photo {
    id: number;
    image: string;
    category: 'events' | 'activity' | 'community';
}

export const AdminDashboard = () => {
    // Activities
    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityForm, setActivityForm] = useState<Partial<Activity>>({ title: '', description: '', displayOn: 'activities' });
    const [activityImage, setActivityImage] = useState<File | null>(null);
    const [editingActivityId, setEditingActivityId] = useState<number | null>(null);
    const [activityMsg, setActivityMsg] = useState('');
    const activityImageRef = useRef<HTMLInputElement>(null);

    // Events
    const [events, setEvents] = useState<Event[]>([]);
    const [eventForm, setEventForm] = useState<Partial<Event>>({ title: '', date: '', time: '', venue: '', description: '', displayOn: 'events' });
    const [eventImage, setEventImage] = useState<File | null>(null);
    const [editingEventId, setEditingEventId] = useState<number | null>(null);
    const [eventMsg, setEventMsg] = useState('');
    const eventImageRef = useRef<HTMLInputElement>(null);

    // Photos
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoCategory, setPhotoCategory] = useState<'events' | 'activity' | 'community'>('events');
    const [photoMsg, setPhotoMsg] = useState('');
    const photoImageRef = useRef<HTMLInputElement>(null);

    // General
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch data
    const fetchActivities = async () => {
        const res = await fetch('/api/activities');
        setActivities(await res.json());
    };
    const fetchEvents = async () => {
        const res = await fetch('/api/events');
        setEvents(await res.json());
    };
    const fetchPhotos = async () => {
        const res = await fetch('/api/photos');
        setPhotos(await res.json());
    };
    useEffect(() => {
        fetchActivities();
        fetchEvents();
        fetchPhotos();
    }, []);

    // --- Activities Handlers ---
    const handleActivityFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setActivityForm({ ...activityForm, [e.target.name]: e.target.value });
    };
    const handleActivityImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setActivityImage(e.target.files[0]);
    };
    const handleActivitySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setActivityMsg('');
        if (!activityForm.title || !activityForm.description || !activityForm.displayOn) {
            setActivityMsg('All fields required');
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', activityForm.title);
            formData.append('description', activityForm.description);
            formData.append('displayOn', activityForm.displayOn);
            if (activityImage) formData.append('image', activityImage);
            let url = '/api/activities', method = 'POST';
            if (editingActivityId) {
                url = `/api/activities/${editingActivityId}`;
                method = 'PUT';
            }
            const res = await fetch(url, { method, body: formData });
            if (!res.ok) throw new Error('Save failed');
            setActivityMsg(editingActivityId ? 'Activity updated' : 'Activity added');
            setActivityForm({ title: '', description: '', displayOn: 'activities' });
            setActivityImage(null);
            if (activityImageRef.current) activityImageRef.current.value = '';
            setEditingActivityId(null);
            fetchActivities();
        } catch {
            setActivityMsg('Error saving activity');
        } finally {
            setLoading(false);
        }
    };
    const handleEditActivity = (a: Activity) => {
        setEditingActivityId(a.id);
        setActivityForm({ title: a.title, description: a.description, displayOn: a.displayOn });
    };
    const handleDeleteActivity = async (id: number) => {
        setActivityMsg('');
        setLoading(true);
        try {
            const res = await fetch(`/api/activities/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            setActivityMsg('Activity deleted');
            fetchActivities();
        } catch {
            setActivityMsg('Error deleting activity');
        } finally {
            setLoading(false);
        }
    };

    // --- Events Handlers ---
    const handleEventFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setEventForm({ ...eventForm, [e.target.name]: e.target.value });
    };
    const handleEventImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setEventImage(e.target.files[0]);
    };
    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEventMsg('');
        if (!eventForm.title || !eventForm.date || !eventForm.time || !eventForm.venue || !eventForm.description || !eventForm.displayOn) {
            setEventMsg('All fields required');
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', eventForm.title);
            formData.append('date', eventForm.date);
            formData.append('time', eventForm.time);
            formData.append('venue', eventForm.venue);
            formData.append('description', eventForm.description);
            formData.append('displayOn', eventForm.displayOn);
            if (eventImage) formData.append('image', eventImage);
            let url = '/api/events', method = 'POST';
            if (editingEventId) {
                url = `/api/events/${editingEventId}`;
                method = 'PUT';
            }
            const res = await fetch(url, { method, body: formData });
            if (!res.ok) throw new Error('Save failed');
            setEventMsg(editingEventId ? 'Event updated' : 'Event added');
            setEventForm({ title: '', date: '', time: '', venue: '', description: '', displayOn: 'events' });
            setEventImage(null);
            if (eventImageRef.current) eventImageRef.current.value = '';
            setEditingEventId(null);
            fetchEvents();
        } catch {
            setEventMsg('Error saving event');
        } finally {
            setLoading(false);
        }
    };
    const handleEditEvent = (e: Event) => {
        setEditingEventId(e.id);
        setEventForm({ title: e.title, date: e.date, time: e.time, venue: e.venue, description: e.description, displayOn: e.displayOn });
    };
    const handleDeleteEvent = async (id: number) => {
        setEventMsg('');
        setLoading(true);
        try {
            const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            setEventMsg('Event deleted');
            fetchEvents();
        } catch {
            setEventMsg('Error deleting event');
        } finally {
            setLoading(false);
        }
    };

    // --- Photos Handlers ---
    const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setPhotoFile(e.target.files[0]);
    };
    const handlePhotoCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPhotoCategory(e.target.value as 'events' | 'activity' | 'community');
    };
    const handlePhotoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPhotoMsg('');
        if (!photoFile || !photoCategory) {
            setPhotoMsg('Image and category required');
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', photoFile);
            formData.append('category', photoCategory);
            const res = await fetch('/api/photos', { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Upload failed');
            setPhotoMsg('Photo uploaded');
            setPhotoFile(null);
            if (photoImageRef.current) photoImageRef.current.value = '';
            fetchPhotos();
        } catch {
            setPhotoMsg('Error uploading photo');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-[#f6f7f9] p-6">
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-[#1a2e22]">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                {/* Activities Section */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-[#1a2e22]">Manage Activities</h2>
                    <form onSubmit={handleActivitySubmit} className="mb-6 flex flex-col gap-4 md:flex-row md:items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={activityForm.title || ''}
                                onChange={handleActivityFormChange}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                placeholder="Activity title"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={activityForm.description || ''}
                                onChange={handleActivityFormChange}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                placeholder="Activity description"
                                rows={2}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                ref={activityImageRef}
                                onChange={handleActivityImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Display On</label>
                            <select
                                name="displayOn"
                                value={activityForm.displayOn || 'activities'}
                                onChange={handleActivityFormChange}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            >
                                <option value="home">Home</option>
                                <option value="activities">Activities</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="rounded bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
                        >
                            {editingActivityId ? 'Update' : 'Add'}
                        </button>
                        {editingActivityId && (
                            <button
                                type="button"
                                onClick={() => { setEditingActivityId(null); setActivityForm({ title: '', description: '', displayOn: 'activities' }); setActivityImage(null); if (activityImageRef.current) activityImageRef.current.value = ''; }}
                                className="rounded bg-gray-300 px-4 py-2 text-gray-700 font-semibold hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                    {activityMsg && <div className={`mb-4 text-sm ${activityMsg.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{activityMsg}</div>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activities.length === 0 ? (
                            <div className="text-gray-500">No activities found.</div>
                        ) : (
                            activities.map((activity) => (
                                <div key={activity.id} className="rounded-lg border bg-[#f6f7f9] p-4 shadow-sm flex flex-col gap-2">
                                    <div className="font-bold text-lg text-[#1a2e22]">{activity.title}</div>
                                    <div className="text-gray-700">{activity.description}</div>
                                    {activity.image && <img src={activity.image} alt="activity" className="h-32 w-full object-cover rounded mb-2" />}
                                    <div className="text-xs text-gray-500">Display: {activity.displayOn}</div>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => handleEditActivity(activity)}
                                            className="rounded bg-blue-500 px-3 py-1 text-white text-xs font-semibold hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteActivity(activity.id)}
                                            className="rounded bg-red-500 px-3 py-1 text-white text-xs font-semibold hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Events Section */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-[#1a2e22]">Manage Events</h2>
                    <form onSubmit={handleEventSubmit} className="mb-6 flex flex-col gap-4 md:flex-row md:items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={eventForm.title || ''}
                                onChange={handleEventFormChange}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                placeholder="Event title"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={eventForm.date || ''}
                                onChange={handleEventFormChange}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input
                                type="time"
                                name="time"
                                value={eventForm.time || ''}
                                onChange={handleEventFormChange}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                            <input
                                type="text"
                                name="venue"
                                value={eventForm.venue || ''}
                                onChange={handleEventFormChange}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                placeholder="Venue"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={eventForm.description || ''}
                                onChange={handleEventFormChange}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                placeholder="Event description"
                                rows={2}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                ref={eventImageRef}
                                onChange={handleEventImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Display On</label>
                            <select
                                name="displayOn"
                                value={eventForm.displayOn || 'events'}
                                onChange={handleEventFormChange}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            >
                                <option value="home">Home</option>
                                <option value="events">Events</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="rounded bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
                        >
                            {editingEventId ? 'Update' : 'Add'}
                        </button>
                        {editingEventId && (
                            <button
                                type="button"
                                onClick={() => { setEditingEventId(null); setEventForm({ title: '', date: '', time: '', venue: '', description: '', displayOn: 'events' }); setEventImage(null); if (eventImageRef.current) eventImageRef.current.value = ''; }}
                                className="rounded bg-gray-300 px-4 py-2 text-gray-700 font-semibold hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                    {eventMsg && <div className={`mb-4 text-sm ${eventMsg.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{eventMsg}</div>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {events.length === 0 ? (
                            <div className="text-gray-500">No events found.</div>
                        ) : (
                            events.map((event) => (
                                <div key={event.id} className="rounded-lg border bg-[#f6f7f9] p-4 shadow-sm flex flex-col gap-2">
                                    <div className="font-bold text-lg text-[#1a2e22]">{event.title}</div>
                                    <div className="text-gray-700">{event.date} {event.time} @ {event.venue}</div>
                                    <div className="text-gray-700">{event.description}</div>
                                    {event.image && <img src={event.image} alt="event" className="h-32 w-full object-cover rounded mb-2" />}
                                    <div className="text-xs text-gray-500">Display: {event.displayOn}</div>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => handleEditEvent(event)}
                                            className="rounded bg-blue-500 px-3 py-1 text-white text-xs font-semibold hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="rounded bg-red-500 px-3 py-1 text-white text-xs font-semibold hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Photos Section */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-[#1a2e22]">Upload Photos to Gallery</h2>
                    <form onSubmit={handlePhotoSubmit} className="mb-6 flex flex-col gap-4 md:flex-row md:items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                ref={photoImageRef}
                                onChange={handlePhotoFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={photoCategory}
                                onChange={handlePhotoCategoryChange}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            >
                                <option value="events">Events</option>
                                <option value="activity">Activity</option>
                                <option value="community">Community</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="rounded bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
                        >
                            Upload
                        </button>
                    </form>
                    {photoMsg && <div className={`mb-4 text-sm ${photoMsg.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{photoMsg}</div>}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['events', 'activity', 'community'].map((cat) => (
                            <div key={cat}>
                                <div className="font-bold text-md text-[#1a2e22] mb-2 capitalize">{cat} Photos</div>
                                <div className="flex flex-wrap gap-2">
                                    {photos.filter(p => p.category === cat).length === 0 ? (
                                        <div className="text-gray-500">No photos</div>
                                    ) : (
                                        photos.filter(p => p.category === cat).map(photo => (
                                            <img key={photo.id} src={photo.image} alt={cat} className="h-24 w-24 object-cover rounded" />
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}; 