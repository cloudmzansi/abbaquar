
import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: "/placeholder.svg", alt: "Children at a Christmas party", category: "Events" },
  { id: 2, src: "/placeholder.svg", alt: "Dance classes", category: "Activities" },
  { id: 3, src: "/placeholder.svg", alt: "Karate lessons", category: "Activities" },
  { id: 4, src: "/placeholder.svg", alt: "Food parcel distribution", category: "Community" },
  { id: 5, src: "/placeholder.svg", alt: "Movie night", category: "Events" },
  { id: 6, src: "/placeholder.svg", alt: "Ballet classes", category: "Activities" },
  { id: 7, src: "/placeholder.svg", alt: "Law clinic session", category: "Community" },
  { id: 8, src: "/placeholder.svg", alt: "Pensioners Christmas party", category: "Events" },
  { id: 9, src: "/placeholder.svg", alt: "Community members", category: "Community" },
];

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Events', 'Activities', 'Community'];

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-abbaquar-light py-12">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-abbaquar-purple">Gallery</h1>
            <p className="text-lg text-center max-w-3xl mx-auto text-gray-600 mb-12">
              Browse through images of our activities, events, and community outreach programs.
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    filter === category
                      ? 'bg-abbaquar-purple text-white'
                      : 'bg-white text-abbaquar-dark hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map(image => (
                <div 
                  key={image.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-abbaquar-dark">{image.alt}</p>
                    <span className="inline-block mt-2 text-sm bg-abbaquar-light text-abbaquar-dark px-3 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
