
import { useState } from 'react';

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
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Movie Night",
    description: "It is free. Reintroduced family time. To help strengthen family bonds. Made children feel included. Help strengthen community bonds.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Law Clinic",
    description: "Hosted by Pro bono Lawyer Maintenance Law Late birth Registration Child Custody and Access Foster Care and Adoption Wills and Estates",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Karate",
    description: "Karate practice strengthens the mind. Develops Composure. Develops self confidence. Improves Co-Ordination. Teaches balance and co-ordination. Teaches humility and honor.",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Food Parcels",
    description: "Food Parcels for the underprivileged families in the community. Basic foods were provided including vegetables and Chicken Covid pack for each family.",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Dance Classes",
    description: "Dance Classes hosted by Battalion Youth.",
    image: "/placeholder.svg"
  }
];

const Activities = () => {
  const [visibleActivities, setVisibleActivities] = useState(6);

  const loadMore = () => {
    setVisibleActivities(prevCount => Math.min(prevCount + 3, activities.length));
  };

  return (
    <section id="activities" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-abbaquar-purple">Activities</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            Join Our Community and discover what we offer. We provide various activities to engage, 
            educate, and empower members of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.slice(0, visibleActivities).map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-abbaquar-dark">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>

        {visibleActivities < activities.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={loadMore}
              className="border border-abbaquar-purple text-abbaquar-purple px-6 py-2 rounded-md hover:bg-abbaquar-purple hover:text-white transition-colors"
            >
              Load More Activities
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Activities;
