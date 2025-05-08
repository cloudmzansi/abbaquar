import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      toast({
        title: "Agreement required",
        description: "Please agree to the terms before submitting.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message received",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#073366] text-white py-20 mt-24">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Contact Us</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              No matter what stage, age, or season you find yourself in, Abbaquar-san Dream Centre is for you! 
              We invite you to come just as you are and be part of this community of people who are striving 
              towards improving lives!
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-[#0A2647] p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-200 mb-2">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-200 mb-2">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-200 mb-2">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-200 mb-2">Message</label>
                      <textarea 
                        id="message" 
                        rows={4} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeToTerms}
                        onChange={() => setAgreeToTerms(!agreeToTerms)}
                        className="mr-2"
                      />
                      <label htmlFor="terms" className="text-gray-200">
                        By using this form you agree with the storage and handling of your data by this website.
                      </label>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="px-6 py-2 rounded-md font-bold bg-[#D4A017] text-white hover:bg-opacity-90 transition-colors shadow-md"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Contact Information */}
              <div>
                <div className="bg-[#0A2647] p-8 rounded-lg shadow-md mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-[#D4A017] mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-white">Address</h3>
                        <p className="text-gray-200">61 Gardenia Road, Wentworth, Durban, 4052</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-[#D4A017] mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-white">Email</h3>
                        <p className="text-gray-200">olivia@abbaquarsandreamcentre.co.za</p>
                        <p className="text-gray-200">info@abbaquar-sandreamcentre.co.za</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-[#D4A017] mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-white">Phone</h3>
                        <p className="text-gray-200">084 251 5740</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#0A2647] p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-white">Service Times</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-200">
                      <span className="font-medium">Monday - Friday</span>
                      <span>8am - 5pm</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span className="font-medium">Saturday</span>
                      <span>9am - 2pm</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span className="font-medium">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="py-8">
          <div className="container-custom">
            <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Map placeholder - Google Maps integration would go here</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
