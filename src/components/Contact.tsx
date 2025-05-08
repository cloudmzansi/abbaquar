import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { LoadingSpinner } from './ui/loading-spinner';
import { ContactFormData } from '@/types';

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
    
    // Validate email
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Show success message
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
    <section id="contact" className="section-padding" aria-labelledby="contact-heading">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4 text-[#073366]">Contact Us</h2>
          <p className="text-lg max-w-3xl mx-auto text-black-600">
            Have questions or want to get involved? Reach out to us today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-6 text-[#073366]">Get in Touch</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-black-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-abbaquar-purple"
                    required
                    aria-required="true"
                    minLength={2}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-black-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-abbaquar-purple"
                    required
                    aria-required="true"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-black-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-abbaquar-purple"
                    required
                    aria-required="true"
                    minLength={5}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-black-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-abbaquar-purple"
                    required
                    aria-required="true"
                    minLength={10}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="bg-[#073366] text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
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
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-6 text-[#073366]">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-[#073366] mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">61 Gardenia Road, Wentworth, Durban, 4052</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-[#073366] mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">084 251 5740</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-[#073366] mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">info@abbaquarsandreamcentre.co.za</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-[#073366]">Service Times</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Thursday</span>
                  <span className="text-gray-600">9am - 4pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Friday</span>
                  <span className="text-gray-600">10am - 2pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday - Sunday</span>
                  <span className="text-gray-600">Closed</span>
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
