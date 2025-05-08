import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Pensioners Christmas Party",
    description: "For pensioners from the community. Morning tea, with sandwiches. Activities – Dancing Competition. Lucky Draws Lunch was served.",
    image: "/assets/pensioners-christmas-party.webp"
  },
  {
    id: 2,
    title: "Movie Night",
    description: "It is free. Reintroduced family time. To help strengthen family bonds. Made children feel included. Help strengthen community bonds.",
    image: "/assets/movie-night.webp"
  },
  {
    id: 3,
    title: "Law Clinic",
    description: "Hosted by Pro bono Lawyer Maintenance Law Late birth Registration Child Custody and Access Foster Care and Adoption Wills and Estates",
    image: "/assets/law-clinic.webp"
  },
  {
    id: 4,
    title: "Karate",
    description: "Karate practice strengthens the mind. Develops Composure. Develops self confidence. Improves Co-Ordination. Teaches balance and co-ordination. Teaches humility and honor.",
    image: "/assets/karate.webp"
  },
  {
    id: 5,
    title: "Food Parcels",
    description: "Food Parcels for the underprivileged families in the community. Basic foods were provided including vegetables and Chicken Covid pack for each family.",
    image: "/assets/food-parcels.webp"
  },
  {
    id: 6,
    title: "Dance Classes",
    description: "Dance Classes hosted by Battalion Youth.",
    image: "/assets/dance-classes.webp"
  },
  {
    id: 7,
    title: "Children Christmas Party",
    description: "Christmas Party for underprivileged children. Dancing competition for our kids. Face painting. Jumping Castles. Father Christmas. Each child had a meal and a party pack.",
    image: "/assets/children-christmas-party.webp"
  },
  {
    id: 8,
    title: "Blood Drive",
    description: "Introduced into the community to help increase the supply. 80% First time donors. Helped our community understand the need to donate. Helped people discover their blood types.",
    image: "/assets/blood-drive.webp"
  },
  {
    id: 9,
    title: "Ballet Classes",
    description: "Teaches children posture. Mental strength and focus Builds social skills Instills confidence Teaches balance and co-ordination",
    image: "/assets/ballet-classes.webp"
  }
];

const ActivitiesPage = () => {
  const { toast } = useToast();

  const handlePosterUpload = () => {
    toast({
      title: "Upload feature",
      description: "In a production environment, this would open a file upload dialog to add new posters.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#0A2647] text-white py-20">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Activities</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Join Our Community and discover what we offer. We provide various activities to engage, 
              educate, and empower members of our community.
            </p>
          </div>
        </section>

        {/* Upload Posters Section */}
        <section className="py-8 bg-[#0A2647]">
          <div className="container-custom">
            <div className="bg-[#0A2647] p-6 rounded-lg shadow-md border border-[#D4A017]">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">Have a poster to share?</h2>
                  <p className="text-gray-200">Upload your event posters to share with the community</p>
                </div>
                <button 
                  onClick={handlePosterUpload}
                  className="flex items-center gap-2 bg-[#D4A017] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  <Upload className="h-5 w-5" />
                  Upload Poster
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-[#0A2647] text-center">Featured Activities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-[#0A2647] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={activity.image} 
                      alt={activity.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">{activity.title}</h3>
                    <p className="text-gray-200">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-[#0A2647]">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">Our Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#0A2647] p-8 rounded-lg shadow-md text-center border border-[#D4A017]">
                <div className="text-4xl font-bold text-[#D4A017] mb-2">500+</div>
                <p className="text-gray-200">Children Supported</p>
              </div>
              <div className="bg-[#0A2647] p-8 rounded-lg shadow-md text-center border border-[#D4A017]">
                <div className="text-4xl font-bold text-[#D4A017] mb-2">9</div>
                <p className="text-gray-200">Regular Programs</p>
              </div>
              <div className="bg-[#0A2647] p-8 rounded-lg shadow-md text-center border border-[#D4A017]">
                <div className="text-4xl font-bold text-[#D4A017] mb-2">100+</div>
                <p className="text-gray-200">Volunteer Hours Monthly</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ActivitiesPage;
