import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Book } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { name: "Brylan Kock", role: "Paramount Chief", image: "/assets/brylan-kock.webp" },
  { name: "Chief Mervyn Damas", role: "District Chief", image: "/assets/chief-mervyn-damas.webp" },
  { name: "Chieftess Olivia Jones", role: "Chairperson", image: "/assets/chieftess-olivia-jones.webp" },
  { name: "Genevieve Coughlan", role: "Treasurer", image: "/assets/genevieve-coughlan.webp" },
  { name: "Headwoman Nolene Ogle", role: "Deputy Chairperson", image: "/assets/headwoman-nolene-ogle.webp" },
  { name: "Jason Abrahams", role: "Senior Chief", image: "/assets/jason-abrahams.webp" },
  { name: "Karen Smarts", role: "Secretary", image: "/assets/karen-smarts.webp" },
  { name: "Kevin Louw", role: "District Chief", image: "/assets/kevin-louw.webp" },
  { name: "Michell Houston", role: "Personal Assistant to District Chiefs", image: "/assets/michell-houston.webp" },
  { name: "Stanley Smith", role: "Marketing Manager", image: "/assets/stanley-smith.webp" }
];

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#073366] text-white py-20 mt-24">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About Us</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Empowering the Youth
            </p>
          </div>
        </section>

        {/* About Organization Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-abbaquar-purple">Our Organization</h2>
                <p className="text-gray-600 mb-6">
                  We are a cultural organization geared towards assisting, uplifting and rebuilding our community. 
                  As an organization our efforts lie predominately with the youth as well as the elderly 
                  within our community. We offer various activities for the youth, namely Ballet, Karate, 
                  Dance Music lessons and a Youth program.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/placeholder.svg"
                  alt="Our organization" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Battalion Youth Section */}
        <section className="py-16 bg-abbaquar-light">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/placeholder.svg"
                  alt="Battalion Youth" 
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6 text-abbaquar-purple">Battalion Youth</h2>
                <h3 className="text-xl font-semibold mb-4">Together We Are Stronger</h3>
                <p className="text-gray-600 mb-6">
                  Battalion Youth is an organization formed by diverse group of youth from different 
                  organizations. We have all been actively involved in various community projects. 
                  We are all civically minded and passionate about community work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Royal House Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-abbaquar-purple">Abbaquar-san Royal House</h2>
                <h3 className="text-xl font-semibold mb-4">Who we work with</h3>
                <p className="text-gray-600 mb-6">
                  We have partnered with the Abbaquar — San Royal House and have a good working relationship 
                  and have become one team. We focus on Feeding Schemes, Team Building activities, 
                  Life Skills programs, Dance Classes, Production drama classes, Counselling, 
                  Street Law Programs, Development Programs, Self Defense, Classes, Media Production, 
                  Matric Tuition Theology one on one.
                </p>
                <p className="text-gray-600">
                  The Abbaquar-San Royal house is now official and recognised in Parliament. 
                  This comes after President Cyril Ramaphosa announced in March that the Traditional 
                  and Khoisan Leadership Act would come into effect from 1 April.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/placeholder.svg"
                  alt="Royal House" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-16 bg-abbaquar-light">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-abbaquar-purple text-center">Our Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all text-center">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      loading="lazy"
                      width="240"
                      height="240"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-abbaquar-dark text-sm">{member.name}</h3>
                    <p className="text-gray-600 text-xs">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-abbaquar-purple text-center">Next Steps</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Want to know what to do next? Follow these steps below or contact us and we will get back to you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="inline-block p-3 bg-purple-100 rounded-full mb-6">
                  <Book className="h-8 w-8 text-abbaquar-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Learn More</h3>
                <p className="text-gray-600">
                  Check what we about and who we are partnered with to familiarize what Abbaquar stands for.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="inline-block p-3 bg-purple-100 rounded-full mb-6">
                  <Users className="h-8 w-8 text-abbaquar-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
                <p className="text-gray-600">
                  Have a look at our different activities we offer at Abbaquar-san Dream Centre or make a donation.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="inline-block p-3 bg-purple-100 rounded-full mb-6">
                  <Heart className="h-8 w-8 text-abbaquar-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Have Questions?</h3>
                <p className="text-gray-600">
                  We are more than happy to answer any questions you have for us.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
