import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../lib/auth';

interface Activity {
    id: number;
    title: string;
    description: string;
    [key: string]: any;
}

export const AdminDashboard = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityForm, setActivityForm] = useState<Partial<Activity>>({ title: '', description: '' });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [activityMsg, setActivityMsg] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Fetch all images
    const fetchImages = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/images');
            const data = await res.json();
            setImages(data);
        } catch (err) {
            setMessage('Error loading images');
        } finally {
            setLoading(false);
        }
    };

    // Fetch all activities
    const fetchActivities = async () => {
        try {
            const res = await fetch('/api/activities');
            const data = await res.json();
            setActivities(data);
        } catch (err) {
            setActivityMsg('Error loading activities');
        }
    };

    useEffect(() => {
        fetchImages();
        fetchActivities();
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage('Please select a file first');
            return;
        }
        setLoading(true);
        setMessage('');
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('Upload failed');
            setMessage('File uploaded successfully!');
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            fetchImages();
        } catch (error) {
            setMessage('Error uploading file');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (imgUrl: string) => {
        const filename = imgUrl.split('/').pop();
        if (!filename) return;
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('/api/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename }),
            });
            if (!res.ok) throw new Error('Delete failed');
            setMessage('Image deleted');
            fetchImages();
        } catch (error) {
            setMessage('Error deleting image');
        } finally {
            setLoading(false);
        }
    };

    // Activities CRUD
    const handleActivityFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setActivityForm({ ...activityForm, [e.target.name]: e.target.value });
    };

    const handleActivitySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setActivityMsg('');
        if (!activityForm.title || !activityForm.description) {
            setActivityMsg('Title and description required');
            return;
        }
        try {
            if (editingId) {
                // Update
                const res = await fetch(`/api/activities/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(activityForm),
                });
                if (!res.ok) throw new Error('Update failed');
                setActivityMsg('Activity updated');
            } else {
                // Add
                const res = await fetch('/api/activities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(activityForm),
                });
                if (!res.ok) throw new Error('Add failed');
                setActivityMsg('Activity added');
            }
            setActivityForm({ title: '', description: '' });
            setEditingId(null);
            fetchActivities();
        } catch (err) {
            setActivityMsg('Error saving activity');
        }
    };

    const handleEditActivity = (activity: Activity) => {
        setEditingId(activity.id);
        setActivityForm({ title: activity.title, description: activity.description });
    };

    const handleDeleteActivity = async (id: number) => {
        setActivityMsg('');
        try {
            const res = await fetch(`/api/activities/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            setActivityMsg('Activity deleted');
            fetchActivities();
        } catch (err) {
            setActivityMsg('Error deleting activity');
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

                {/* Upload Section */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-[#1a2e22]">Upload Photos</h2>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
                        />
                        <button
                            onClick={handleUpload}
                            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                            disabled={!selectedFile || loading}
                        >
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    {message && (
                        <div className={`mt-2 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</div>
                    )}
                </div>

                {/* Image Gallery */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-[#1a2e22]">Uploaded Images</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : images.length === 0 ? (
                        <div className="text-gray-500">No images found.</div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {images.map((img, idx) => (
                                <div key={img} className="relative rounded-lg border bg-[#f6f7f9] p-2 shadow-sm flex flex-col items-center">
                                    <img src={img} alt={`uploaded-${idx}`} className="h-32 w-full object-cover rounded mb-2" />
                                    <button
                                        onClick={() => handleDelete(img)}
                                        className="absolute top-2 right-2 rounded-full bg-red-500 text-white px-2 py-1 text-xs hover:bg-red-600"
                                        title="Delete"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Activities/Events Management */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-[#1a2e22]">Manage Activities & Events</h2>
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
                        <button
                            type="submit"
                            className="rounded bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
                        >
                            {editingId ? 'Update' : 'Add'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => { setEditingId(null); setActivityForm({ title: '', description: '' }); }}
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
            </div>
        </div>
    );
}; 