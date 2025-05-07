import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-[#073366] text-gray-800 pt-32 md:pt-48 lg:pt-56 py-20 mb-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Welcome to Abbaquar - San Dream Centre
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg text-white">
              No matter what stage, age, or season you find yourself in, Abbaquar-san Dream Centre is for you! 
              We invite you to come just as you are and be part of this community.
            </p>
            <div className="flex flex-row flex-wrap gap-3">
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
                src="/lovable-uploads/hero.png" 
                alt="Hero Image" 
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
