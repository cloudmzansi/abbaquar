import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ContactFormData } from '@/types';
import { submitContactForm } from '@/api/contact';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Map from '@/components/Map';

const Contact = () => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      toast({
        title: "Agreement required",
        description: "Please agree to the terms before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData);
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#073366] pb-20 pt-28 md:pt-[120px]">
          <div className="container-custom">
            <h1 className="text-[#F5F5F0] text-4xl md:text-5xl font-bold mb-6 text-center">Contact Us</h1>
            <p className="text-[#E0E9FF] text-xl text-center max-w-3xl mx-auto">
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
                <div className="bg-[#073366] p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-[#F5F5F0]">Send us a message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-[#E0E9FF] mb-2">Name</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-[#E0E9FF] mb-2">Email</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-[#E0E9FF] mb-2">Subject</label>
                      <input 
                        type="text" 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-[#E0E9FF] mb-2">Message</label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
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
                      <label htmlFor="terms" className="text-[#E0E9FF]">
                        By using this form you agree with the storage and handling of your data by this website.
                      </label>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="px-6 py-2 rounded-md font-bold bg-[#D4A017] text-white hover:bg-opacity-90 transition-colors shadow-md flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Contact Information */}
              <div>
                <div className="bg-[#073366] p-8 rounded-lg shadow-md mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-[#F5F5F0]">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-[#D4A017] mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-[#F5F5F0]">Address</h3>
                        <p className="text-[#E0E9FF]">61 Gardenia Road, Wentworth, Durban, 4052</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-[#D4A017] mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-[#F5F5F0]">Email</h3>
                        <p className="text-[#E0E9FF]">info@abbaquar-sandreamcentre.co.za</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-[#D4A017] mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-[#F5F5F0]">Phone</h3>
                        <p className="text-[#E0E9FF]">084 251 5740</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#073366] p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-[#F5F5F0]">Service Times</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-[#E0E9FF]">
                      <span className="font-medium">Monday - Friday</span>
                      <span>8am - 5pm</span>
                    </div>
                    <div className="flex justify-between text-[#E0E9FF]">
                      <span className="font-medium">Saturday</span>
                      <span>9am - 2pm</span>
                    </div>
                    <div className="flex justify-between text-[#E0E9FF]">
                      <span className="font-medium">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8">
          <div className="container-custom">
            <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
              <Map className="w-full h-full" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
