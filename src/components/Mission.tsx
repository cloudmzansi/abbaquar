import { Heart, Users, Calendar, Book } from 'lucide-react';

const Mission = () => {
  return (
    <section id="mission" className="section-padding mb-8">
      <div className="container-custom">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#073366]">Our Mission</h2>
          <div className="mx-auto w-24 h-1 bg-[#D72660] rounded mb-6" />
          <p className="text-lg max-w-3xl mx-auto text-[#073366]">
            We aim to create a safe haven for our youth, getting them off the streets; creating a place where we can help 
            our youth achieve their dreams; to uplift our youth and empower them with various skills development programs; 
            to introduce extramural activities back to the community and reintroduce family values into the community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="bg-[#0A2647] p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="inline-block p-3 bg-[#FDE68A] rounded-full mb-4">
              <Heart className="h-8 w-8 text-[#D72660]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Safe Haven</h3>
            <p className="text-gray-200">Creating a safe environment for the youth in our community.</p>
          </div>
          <div className="bg-[#0A2647] p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="inline-block p-3 bg-[#C4B5FD] rounded-full mb-4">
              <Users className="h-8 w-8 text-[#4E2D7A]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Community Support</h3>
            <p className="text-gray-200">Supporting families and building stronger community bonds.</p>
          </div>
          <div className="bg-[#0A2647] p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="inline-block p-3 bg-[#FCA5A5] rounded-full mb-4">
              <Calendar className="h-8 w-8 text-[#D72660]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Extramural Activities</h3>
            <p className="text-gray-200">Reintroducing extramural activities for youth development.</p>
          </div>
          <div className="bg-[#0A2647] p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="inline-block p-3 bg-[#A7F3D0] rounded-full mb-4">
              <Book className="h-8 w-8 text-[#1E5C2A]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Skills Development</h3>
            <p className="text-gray-200">Empowering youth with skills and education for a better future.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
