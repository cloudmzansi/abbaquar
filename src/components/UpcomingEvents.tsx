import React from "react";

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

const UpcomingEvents = () => (
  <section className="section-padding mb-16">
    <div className="container-custom">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#4E2D7A]">Upcoming Events</h2>
        <div className="mx-auto w-24 h-1 bg-[#D72660] rounded mb-6" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-2 text-[#073366]">{event.name}</h3>
            <div className="mb-2 text-sm text-[#D72660] font-bold">{event.date} &bull; {event.time}</div>
            <div className="mb-2 text-sm text-gray-500">{event.location}</div>
            <p className="text-gray-700 flex-grow">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UpcomingEvents; 