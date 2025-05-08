import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from "@/components/Footer";

interface Photo {
  id: number;
  image: string;
  category: 'events' | 'activity' | 'community';
}

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Events', 'Activities', 'Community'];

  useEffect(() => {
    fetch('/api/photos')
      .then(res => res.json())
      .then(setPhotos);
  }, []);

  const filteredPhotos = filter === 'All'
    ? photos
    : photos.filter(photo => {
        if (filter === 'Events') return photo.category === 'events';
        if (filter === 'Activities') return photo.category === 'activity';
        if (filter === 'Community') return photo.category === 'community';
        return true;
      });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#073366] text-white py-20 mt-[88px]">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Gallery</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Browse through images of our activities, events, and community outreach programs.
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex justify-center mb-8 gap-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full font-semibold ${filter === cat ? 'bg-[#073366] text-white' : 'bg-white text-[#073366] border border-[#073366]'}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredPhotos.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">No images found.</div>
              ) : (
                filteredPhotos.map(photo => (
                  <div key={photo.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <img src={photo.image} alt={photo.category} className="w-full h-64 object-cover" />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
