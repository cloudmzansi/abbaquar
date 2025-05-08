import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './UpcomingEvents.css';

const events = [
  {
    name: "Youth Empowerment Workshop",
    date: "Sat, 20 July 2024",
    time: "10:00 AM - 1:00 PM",
    location: "Dream Centre Hall",
    description: "A hands-on workshop for local youth to learn leadership, teamwork, and creative skills. Open to all ages 12-18.",
  },
  {
    name: "Community Family Day",
    date: "Sun, 4 August 2024",
    time: "12:00 PM - 4:00 PM",
    location: "Wentworth Park",
    description: "Bring your family for a day of games, food, and fun! All proceeds go to supporting our youth programs.",
  },
  {
    name: "Legal Aid Clinic",
    date: "Wed, 14 August 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Dream Centre Office",
    description: "Free legal advice for community members. Book your slot in advance.",
  },
];

const EventCard = ({ event }: { event: typeof events[0] }) => (
  <div className="bg-gray-50 rounded-2xl p-6 h-full">
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <Calendar className="h-6 w-6 text-[#8A4BA3]" />
        </div>
        <span className="text-sm font-medium text-[#8A4BA3] bg-[#8A4BA3]/10 px-3 py-1 rounded-full">
          Upcoming
        </span>
      </div>

      <h3 className="text-xl font-semibold text-[#073366] mt-2">{event.name}</h3>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.time}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.location}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm">{event.description}</p>
    </div>
  </div>
);

const UpcomingEvents = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-[#8A4BA3] font-semibold mb-4 block">Join Us</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#073366] font-serif">Upcoming Events</h2>
          <p className="text-lg text-gray-600">
            Join our community events and make a difference. Every event is an opportunity to connect, 
            learn, and create positive change.
          </p>
        </div>

        {isMobile ? (
          <div className="w-full pb-12">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              pagination={{ 
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active-purple'
              }}
              className="w-full events-swiper"
            >
              {events.map((event, idx) => (
                <SwiperSlide key={idx}>
                  <EventCard event={event} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <EventCard key={idx} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents; 