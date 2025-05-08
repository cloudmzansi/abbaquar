import { ContactFormData } from '@/types';

/**
 * Submits the contact form data to the server
 * 
 * @param {ContactFormData} data - The form data to submit
 * @returns {Promise<{success: boolean, message: string}>} - The response from the server
 * @throws {Error} - Throws an error if validation fails or if the server request fails
 * 
 * @example
 * try {
 *   const result = await submitContactForm({
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *     subject: 'Inquiry',
 *     message: 'Hello'
 *   });
 * } catch (error) {
 *   console.error(error);
 * }
 */
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  // Validate required fields
  const requiredFields: (keyof ContactFormData)[] = ['name', 'email', 'subject', 'message'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Invalid email format');
  }

  try {
    // Create FormData
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch('https://kdinteriors.co.za/contact.php', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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
    throw new Error(error instanceof Error ? error.message : 'Failed to send message');
  }
} 