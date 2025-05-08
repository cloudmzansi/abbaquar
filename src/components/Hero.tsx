import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-[#073366] to-[#0A2647] text-gray-800 min-h-[calc(100vh-6rem)] flex items-center mt-24">
      <div className="container-custom py-16 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white text-center md:text-left font-serif">
              A Simple Act of Kindness Can Change Lives
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-lg text-gray-200 text-center md:text-left">
              No matter what stage, age, or season you find yourself in, Abbaquar-san Dream Centre is for you! 
              Join us in creating a brighter, more compassionate future.
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
                className="bg-white/10 text-white px-8 py-3.5 text-lg rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                View Our Programs
              </Link>
            </div>
            
            {/* Impact Stats */}
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                ))}
              </div>
              <p className="text-gray-200">
                <span className="font-semibold">10,000+ people</span> helped because of your kindness
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/assets/hero.webp" 
                  alt="Abbaquar San Dream Centre community event" 
                  width="600" height="400"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg max-w-[200px]">
                <div className="flex flex-col gap-2">
                  <span className="text-2xl font-bold text-[#0A2647]">$245,500</span>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#D72660] h-2 rounded-full" style={{ width: '56%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>512 donors</span>
                    <span>56%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
