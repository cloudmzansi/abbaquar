import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ActivitiesProps {
  showHeader?: boolean;
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
    description: "Hosted by the Dream Centre. Builds confidence and creativity. Improves physical fitness and coordination. Encourages self-expression through movement.",
    image: "/assets/dance-classes.webp"
  }
];

const Activities = ({ showHeader = true }: ActivitiesProps) => {
  const [visibleActivities, setVisibleActivities] = useState(6);

  const loadMore = () => {
    setVisibleActivities(prevCount => Math.min(prevCount + 3, activities.length));
  };

  return (
    <section id="activities" className="py-24 bg-gray-50">
      <div className="container-custom">
        {showHeader && (
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-[#D72660] font-semibold mb-4 block">Our Programs</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#073366] font-serif">Activities</h2>
            <p className="text-lg text-gray-600">
              Join our community and discover what we offer. We provide various activities to engage, 
              educate, and empower members of our community.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.slice(0, visibleActivities).map((activity) => (
            <div key={activity.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width="400"
                  height="300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-[#073366]">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>

        {visibleActivities < activities.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-white text-[#073366] px-8 py-3 rounded-full border-2 border-[#073366] hover:bg-[#073366] hover:text-white transition-all flex items-center gap-2 mx-auto"
            >
              Load More Activities
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Activities;
