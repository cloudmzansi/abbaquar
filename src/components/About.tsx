const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#D4A017]">About Us</h2>
          <div className="mx-auto w-24 h-1 bg-[#4E2D7A] rounded mb-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">The Royal House</h3>
            <p className="text-[#073366] mb-6">
              The Abbaquar-San Royal house is now official and recognised in Parliament. 
              This comes after President Cyril Ramaphosa announced in March that the Traditional 
              and Khoisan Leadership Act would come into effect from 1 April.
            </p>
            <h3 className="text-xl font-semibold mb-4 text-white">Community</h3>
            <p className="text-[#073366] mb-6">
              We are a cultural organization geared towards assisting, uplifting and rebuilding our community. 
              As an organization our efforts lie predominately with the youth as well as the elderly within our community. 
              We offer various activities for the youth, namely Ballet, Karate, Dance, Music lessons and a Youth program.
            </p>
            <a href="https://abbaquar.netlify.app/about-us" className="bg-[#CC8B1F] text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all inline-block">Learn More</a>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl bg-white">
            <img 
              src="/lovable-uploads/about-us.webp" 
              alt="Abbaquar Community" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
