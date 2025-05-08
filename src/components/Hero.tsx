import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-[#1B4332] text-gray-800 min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white text-center lg:text-left">
              A Simple Act of Charity Can Change a Lifetime
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 text-center lg:text-left max-w-2xl">
              Charity brings hope, opportunity, and change, helping build a brighter, more compassionate future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/#donate"
                className="bg-[#2D6A4F] text-white px-8 py-3.5 text-lg rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg active:scale-100 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Donate Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/about-us"
                className="bg-transparent text-white px-8 py-3.5 text-lg rounded-full font-semibold hover:bg-white/10 transition-all border border-white/20 flex items-center justify-center w-full sm:w-auto"
              >
                View Our Program
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/hero.webp"
                  alt="Community impact"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Help Restore Flood-Affected Settlements</p>
                      <p className="text-2xl font-bold text-gray-900">$245,800.50</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-[#2D6A4F] h-2 w-24 rounded-full overflow-hidden">
                        <div className="bg-[#40916C] w-[96%] h-full rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">96%</span>
                    </div>
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
