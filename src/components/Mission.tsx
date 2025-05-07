
import { Heart, Users, Calendar, Book } from 'lucide-react';

const Mission = () => {
  return (
    <section id="mission" className="bg-abbaquar-light section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#6e20aa]">Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            We aim to create a safe haven for our youth, getting them off the streets; creating a place where we can help 
            our youth achieve their dreams; to uplift our youth and empower them with various skills development programs; 
            to introduce extramural activities back to the community and reintroduce family values into the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
              <Heart className="h-8 w-8 text-abbaquar-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe Haven</h3>
            <p className="text-black-600">Creating a safe environment for the youth in our community.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-abbaquar-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-gray-600">Supporting families and building stronger community bonds.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-abbaquar-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Extramural Activities</h3>
            <p className="text-gray-600">Reintroducing extramural activities for youth development.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
              <Book className="h-8 w-8 text-abbaquar-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Skills Development</h3>
            <p className="text-gray-600">Empowering youth with skills and education for a better future.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
