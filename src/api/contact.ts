import { ContactFormData } from '@/types';

export async function submitContactForm(data: ContactFormData) {
  // Validate data
  if (!data.name || !data.email || !data.subject || !data.message) {
    throw new Error('All fields are required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Invalid email format');
  }

  // Here you would typically send this to your backend server
  // For now, we'll simulate an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success
      if (Math.random() > 0.1) { // 90% success rate
        resolve({
          success: true,
          message: 'Message sent successfully'
        });
      } else {
        // Simulate error
        reject(new Error('Failed to send message'));
      }
    }, 1000);
  });
} 