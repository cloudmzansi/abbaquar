import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../lib/auth';

export const AdminDashboard = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

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

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const content = e.target?.result;
                // Here you would handle the file content
                // For now, we'll just show a success message
                setMessage('File uploaded successfully!');
                setSelectedFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            };
            reader.readAsDataURL(selectedFile);
        } catch (error) {
            setMessage('Error uploading file');
            console.error('Upload error:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold">Upload Photos</h2>
                    <div className="space-y-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:rounded-full file:border-0
                                file:bg-indigo-50 file:px-4 file:py-2
                                file:text-sm file:font-semibold file:text-indigo-700
                                hover:file:bg-indigo-100"
                        />
                        <button
                            onClick={handleUpload}
                            className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                            disabled={!selectedFile}
                        >
                            Upload
                        </button>
                        {message && (
                            <div className={`mt-2 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>

                {/* Add more admin sections here */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold">Manage Content</h2>
                    {/* Add content management UI here */}
                    <p className="text-gray-600">Content management features coming soon...</p>
                </div>
            </div>
        </div>
    );
}; 