const About = () => {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-[#D72660] font-semibold mb-4 block">Who We Are</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#073366] font-serif">About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a cultural organization dedicated to uplifting and rebuilding our community through various programs and initiatives.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#073366]">The Royal House</h3>
              <p className="text-gray-600">
                The Abbaquar-San Royal house is now official and recognised in Parliament. 
                This comes after President Cyril Ramaphosa announced in March that the Traditional 
                and Khoisan Leadership Act would come into effect from 1 April.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#073366]">Our Community</h3>
              <p className="text-gray-600">
                We are a cultural organization geared towards assisting, uplifting and rebuilding our community. 
                As an organization our efforts lie predominately with the youth as well as the elderly within our community. 
                We offer various activities for the youth, namely Ballet, Karate, Dance, Music lessons and a Youth program.
              </p>
            </div>
            <div className="pt-4">
              <a 
                href="/about-us" 
                className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-[#D72660] rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105"
              >
                Learn More About Us
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/about-us.webp" 
                alt="Abbaquar Community" 
                className="w-full h-full object-cover"
                width="600"
                height="400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
