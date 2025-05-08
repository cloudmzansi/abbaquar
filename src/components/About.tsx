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
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="inline-block p-3 bg-purple-100 rounded-xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#073366]">The Royal House</h3>
              <p className="text-gray-600">
                The Abbaquar-San Royal house is now official and recognised in Parliament. 
                This comes after President Cyril Ramaphosa announced in March that the Traditional 
                and Khoisan Leadership Act would come into effect from 1 April.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="inline-block p-3 bg-green-100 rounded-xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
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
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#D72660] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">10+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
