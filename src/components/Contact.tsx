import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { LoadingSpinner } from './ui/loading-spinner';
import { ContactFormData } from '@/types';
import { submitContactForm } from '@/api/contact';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
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
    <section className="py-24 bg-gradient-to-b from-[#073366] to-[#0A2647]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-[#2ECC71] font-semibold mb-4 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-serif">Contact Us</h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Have questions or want to get involved? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 text-lg font-semibold mb-2">
                      Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:border-[#2ECC71] transition-all"
                      required
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-lg font-semibold mb-2">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:border-[#2ECC71] transition-all"
                      required
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 text-lg font-semibold mb-2">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:border-[#2ECC71] transition-all"
                    required
                    placeholder="Message subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-lg font-semibold mb-2">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:border-[#2ECC71] transition-all"
                    required
                    placeholder="Your message"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#2ECC71] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center justify-center"
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
          
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <MapPin className="h-6 w-6 text-[#2ECC71]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Address</h4>
                    <p className="text-gray-200">61 Gardenia Road, Wentworth, Durban, 4052</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Phone className="h-6 w-6 text-[#2ECC71]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Phone</h4>
                    <p className="text-gray-200">084 251 5740</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Mail className="h-6 w-6 text-[#2ECC71]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Email</h4>
                    <p className="text-gray-200 break-all">info@abbaquarsandreamcentre.co.za</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <h3 className="text-xl font-semibold mb-6 text-white">Service Times</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-200">
                  <span className="font-medium">Monday - Thursday</span>
                  <span>9am - 4pm</span>
                </div>
                <div className="flex justify-between text-gray-200">
                  <span className="font-medium">Friday</span>
                  <span>10am - 2pm</span>
                </div>
                <div className="flex justify-between text-gray-200">
                  <span className="font-medium">Saturday - Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
