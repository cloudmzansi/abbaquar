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
  { id: 1, src: "/assets/children-christmas-party.webp", alt: "Children at a Christmas party", category: "Events" },
  { id: 2, src: "/assets/dance-classes.webp", alt: "Dance classes", category: "Activities" },
  { id: 3, src: "/assets/karate.webp", alt: "Karate lessons", category: "Activities" },
  { id: 4, src: "/assets/food-parcels.webp", alt: "Food parcel distribution", category: "Community" },
  { id: 5, src: "/assets/movie-night.webp", alt: "Movie night", category: "Events" },
  { id: 6, src: "/assets/ballet-classes.webp", alt: "Ballet classes", category: "Activities" },
  { id: 7, src: "/assets/law-clinic.webp", alt: "Law clinic session", category: "Community" },
  { id: 8, src: "/assets/pensioners-christmas-party.webp", alt: "Pensioners Christmas party", category: "Events" },
  { id: 9, src: "/assets/community.webp", alt: "Community members", category: "Community" },
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
        {/* Hero Section */}
        <section className="bg-[#073366] text-white pb-20 pt-28 md:pt-[120px]">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Gallery</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Browse through images of our activities, events, and community outreach programs.
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16">
          <div className="container-custom">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    filter === category
                      ? 'bg-[#D4A017] text-white'
                      : 'bg-[#0A2647] text-white hover:bg-opacity-90'
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
                  className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
