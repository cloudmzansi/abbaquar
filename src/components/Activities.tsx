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

const Activities = () => {
  const [visibleActivities, setVisibleActivities] = useState(6);

  const loadMore = () => {
    setVisibleActivities(prevCount => Math.min(prevCount + 3, activities.length));
  };

  return (
    <section id="activities" className="section-padding mb-16">
      <div className="container-custom">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#073366]">Activities</h2>
          <div className="mx-auto w-24 h-1 bg-[#D4A017] rounded mb-6" />
          <p className="text-lg max-w-3xl mx-auto text-[#073366]">
            Join our community and discover what we offer. We provide various activities to engage, 
            educate, and empower members of our community.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {activities.slice(0, visibleActivities).map((activity, idx) => (
            <div key={activity.id} className="bg-[#0A2647] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={activity.image.replace('/lovable-uploads/', '/assets/')} 
                  alt={(() => {
                    switch (activity.title) {
                      case 'Pensioners Christmas Party':
                        return 'Elderly community members enjoying a Christmas party with food and dancing';
                      case 'Movie Night':
                        return 'Families and children attending a community movie night';
                      case 'Law Clinic':
                        return 'Pro bono law clinic event with legal advice and support';
                      case 'Karate':
                        return 'Children practicing karate for confidence and coordination';
                      case 'Food Parcels':
                        return 'Food parcels being distributed to underprivileged families';
                      case 'Dance Classes':
                        return 'Community dance class encouraging creativity and fitness';
                      default:
                        return activity.title;
                    }
                  })()} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  width="400"
                  height="300"
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
  );
};

export default Activities;
