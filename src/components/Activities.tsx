import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Activities.css';

interface Activity {
  id: number;
  title: string;
  description: string;
  image?: string;
  displayOn: 'home' | 'activities' | 'both';
}

interface ActivitiesProps {
  showHeader?: boolean;
  displayOn?: 'home' | 'activities';
}

const Activities = ({ showHeader = true, displayOn = 'activities' }: ActivitiesProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/api/activities')
      .then(res => res.json())
      .then(data => {
        if (displayOn === 'home') {
          setActivities(data.filter((a: Activity) => a.displayOn === 'home' || a.displayOn === 'both'));
        } else {
          setActivities(data.filter((a: Activity) => a.displayOn === 'activities' || a.displayOn === 'both'));
        }
      });
  }, [displayOn]);

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
              className="w-full activities-swiper"
            >
              {activities.map((activity) => (
                <SwiperSlide key={activity.id}>
                  <ActivityCard activity={activity} />
                </SwiperSlide>
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
