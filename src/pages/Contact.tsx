import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ContactFormData } from '@/types';
import { submitContactForm } from '@/api/contact';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Map from '@/components/Map';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Reset errors when form data changes
  useEffect(() => {
    setErrors({});
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive"
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms before submitting.",
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
      setAgreeToTerms(false);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
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
        <section className="bg-[#073366] py-20 mt-[88px]" role="banner">
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
        <section className="py-16" role="main">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-[#073366] p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-[#F5F5F0]" id="contact-form">Send us a message</h2>
                  
                  <form 
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    aria-labelledby="contact-form"
                    noValidate
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-[#E0E9FF] mb-2">
                          Name <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017] ${
                            errors.name ? 'border-red-500' : ''
                          }`}
                          required
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-[#E0E9FF] mb-2">
                          Email <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017] ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-[#E0E9FF] mb-2">
                        Subject <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017] ${
                          errors.subject ? 'border-red-500' : ''
                        }`}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        disabled={isSubmitting}
                      />
                      {errors.subject && (
                        <p id="subject-error" className="mt-1 text-sm text-red-500" role="alert">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-[#E0E9FF] mb-2">
                        Message <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4} 
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A017] ${
                          errors.message ? 'border-red-500' : ''
                        }`}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeToTerms}
                        onChange={() => setAgreeToTerms(!agreeToTerms)}
                        className="mr-2 h-4 w-4"
                        disabled={isSubmitting}
                        aria-required="true"
                      />
                      <label htmlFor="terms" className="text-[#E0E9FF]">
                        By using this form you agree with the storage and handling of your data by this website.
                        <span className="text-red-500" aria-hidden="true"> *</span>
                      </label>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="px-6 py-2 rounded-md font-bold bg-[#D4A017] text-white hover:bg-opacity-90 transition-colors shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" aria-hidden="true" />
                          <span>Sending...</span>
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
                      <MapPin className="h-6 w-6 text-[#D4A017] mr-3 mt-1" aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold text-[#F5F5F0]">Address</h3>
                        <address className="text-[#E0E9FF] not-italic">
                          61 Gardenia Road, Wentworth, Durban, 4052
                        </address>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-[#D4A017] mr-3 mt-1" aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold text-[#F5F5F0]">Email</h3>
                        <a 
                          href="mailto:info@abbaquar-sandreamcentre.co.za"
                          className="text-[#E0E9FF] hover:text-white transition-colors"
                        >
                          info@abbaquar-sandreamcentre.co.za
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-[#D4A017] mr-3 mt-1" aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold text-[#F5F5F0]">Phone</h3>
                        <a 
                          href="tel:+27842515740"
                          className="text-[#E0E9FF] hover:text-white transition-colors"
                        >
                          084 251 5740
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#073366] p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-[#F5F5F0]">Service Times</h2>
                  
                  <dl className="space-y-4">
                    <div className="flex justify-between text-[#E0E9FF]">
                      <dt className="font-medium">Monday - Friday</dt>
                      <dd>8am - 5pm</dd>
                    </div>
                    <div className="flex justify-between text-[#E0E9FF]">
                      <dt className="font-medium">Saturday</dt>
                      <dd>9am - 2pm</dd>
                    </div>
                    <div className="flex justify-between text-[#E0E9FF]">
                      <dt className="font-medium">Sunday</dt>
                      <dd>Closed</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8" aria-label="Location map">
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
