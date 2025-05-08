import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const ActivityCard = ({ activity }: { activity: Activity }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={activity.image} 
          alt={activity.title}
          className="w-full h-full object-cover"
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
  );

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

        {isMobile ? (
          <div className="w-full pb-12">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              pagination={{ clickable: true }}
            >
              {activities.map((activity) => (
                <div key={activity.id} className="swiper-slide">
                  <ActivityCard activity={activity} />
                </div>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Activities;
