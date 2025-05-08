import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-[#073366] text-gray-800 min-h-[calc(100vh-6rem)] flex items-center mt-24">
      <div className="container-custom py-16 md:py-0">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white text-center md:text-left">
              Welcome to Abbaquar - San Dream Centre
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg text-white text-center md:text-left">
              No matter what stage, age, or season you find yourself in, Abbaquar-san Dream Centre is for you! 
              We invite you to come just as you are and be part of this community.
            </p>
            <div className="flex flex-row flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/activities" className="bg-[#0A2647] text-white px-6 py-2 text-base rounded-md font-medium hover:bg-opacity-90 transition-all">
                Our Activities
              </Link>
              <a href="/#donate" className="bg-[#D72660] text-white px-6 py-2 text-base rounded-md font-medium hover:bg-opacity-90 transition-all text-center">
                Donate Now
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/assets/hero.webp" 
                alt="Abbaquar San Dream Centre community event" 
                width="600" height="400"
                className="w-full h-full object-contain bg-white p-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
