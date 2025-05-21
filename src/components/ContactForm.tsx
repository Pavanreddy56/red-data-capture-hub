
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  companyName: string;
  message: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    companyName: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // We would typically send this data to a backend API
    // For now we'll simulate an API call with a timeout
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form data submitted:', formData);
      
      // Show success message
      toast({
        title: "Information Submitted!",
        description: "We've received your information and will contact you soon.",
      });
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        companyName: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-company-dark mb-6">Get in Touch</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              required
              className="w-full"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, City, State, Zip"
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your Company, Inc."
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">How Can We Help?</label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your IT needs..."
            rows={4}
            className="w-full"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-company-primary hover:bg-company-secondary"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Information'}
        </Button>
        
        <p className="text-xs text-gray-500 mt-4">
          By submitting this form, you agree to our privacy policy and consent to us collecting your personal information.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
