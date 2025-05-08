import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-[#073366] to-[#0A2647] text-gray-800 min-h-[calc(100vh-6rem)] flex items-center mt-24">
      <div className="container-custom py-16 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white text-center md:text-left font-serif">
              Welcome to Abbaquar - San Dream Centre
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-lg text-gray-200 text-center md:text-left">
              No matter what stage, age, or season you find yourself in, Abbaquar-san Dream Centre is for you! 
              We invite you to come just as you are and be part of this community.
            </p>
            <div className="flex flex-row flex-wrap gap-4 justify-center md:justify-start">
              <a href="/#donate" 
                className="bg-[#D72660] text-white px-8 py-3.5 text-lg rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg active:scale-100 flex items-center gap-2"
              >
                Donate Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link 
                to="/activities" 
                className="bg-[#0A2647] text-white px-8 py-3.5 text-lg rounded-full font-semibold hover:bg-opacity-90 transition-all border border-white/20"
              >
                Our Activities
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/assets/hero.webp" 
                  alt="Abbaquar San Dream Centre community event" 
                  width="600" height="400"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
