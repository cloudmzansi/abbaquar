import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRef } from 'react';

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    // Debug: log all form data entries
    for (let [key, value] of formData.entries()) {
      console.log('FormData:', key, value);
    }
    try {
      const response = await fetch('https://kdinteriors.co.za/contact.php', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Message sent',
          description: "Thank you for reaching out. We'll get back to you soon!",
        });
        form.reset();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to send message.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#073366]">Contact Us</h2>
          <p className="text-lg max-w-3xl mx-auto text-black-600">
            Have questions or want to get involved? Reach out to us today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-6 text-[#073366]">Get in Touch</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
                <div>
                  <label htmlFor="name" className="block text-black-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    autoComplete="name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-abbaquar-purple"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-black-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    autoComplete="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-abbaquar-purple"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-black-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    autoComplete="subject"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-abbaquar-purple"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-black-700 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    autoComplete="off"
                    rows={4} 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-abbaquar-purple"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="bg-[#073366] text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all"
                >
                  Send Message
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
