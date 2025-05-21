
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Services Section */}
        <section id="services" className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-company-dark mb-4">Our IT Services</h2>
              <div className="w-20 h-1 bg-company-primary mx-auto mb-6"></div>
              <p className="text-gray-600">
                We provide comprehensive IT solutions to help your business thrive in the digital age.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "IT Infrastructure",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                  ),
                  description: "Design, implementation and management of robust IT infrastructure that meets your business needs."
                },
                {
                  title: "Cloud Solutions",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
                  ),
                  description: "Migrating and managing your applications and data in secure and scalable cloud environments."
                },
                {
                  title: "Cybersecurity",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"></path><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line></svg>
                  ),
                  description: "Protecting your sensitive data and systems from cyber threats with comprehensive security solutions."
                },
                {
                  title: "Software Development",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  ),
                  description: "Custom software development tailored to your specific business requirements and objectives."
                },
                {
                  title: "IT Consulting",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                  ),
                  description: "Strategic IT planning and guidance to align your technology with your business goals."
                },
                {
                  title: "Technical Support",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  ),
                  description: "Reliable technical support and maintenance services to ensure your systems run smoothly."
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-company-primary mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-company-dark mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <AboutUs />
        
        {/* Contact Section */}
        <section id="contact" className="py-16 bg-company-light">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-company-accent/10 text-company-primary rounded-full text-sm font-medium">
                  Get In Touch
                </div>
                <h2 className="text-3xl font-bold text-company-dark">Ready to Transform Your IT Infrastructure?</h2>
                <p className="text-gray-600 max-w-lg">
                  Fill out the form, and our team will get back to you within 24 hours. 
                  We're eager to understand your IT needs and provide tailored solutions.
                </p>
                
                <div className="space-y-4 mt-8">
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-company-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-company-dark">Our Location</h4>
                      <p className="text-gray-600">123 Tech Park, Hyderabad, Telangana, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-company-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-company-dark">Contact Number</h4>
                      <p className="text-gray-600">+91 9876543210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-company-primary"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-company-dark">Email Address</h4>
                      <p className="text-gray-600">info@cpreddyitsolutions.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
