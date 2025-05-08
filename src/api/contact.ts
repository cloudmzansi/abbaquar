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

  try {
    // Create FormData
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('subject', data.subject);
    formData.append('message', data.message);

    const response = await fetch('https://kdinteriors.co.za/contact.php', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: 'Message sent successfully'
      };
    } else {
      throw new Error(result.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send message');
  }
} 