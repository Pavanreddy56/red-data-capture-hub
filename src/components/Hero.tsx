
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-company-light to-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-block px-3 py-1 bg-company-accent/10 text-company-primary rounded-full text-sm font-medium">
              IT Solutions Provider
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-company-dark leading-tight">
              Powering Your Digital <span className="text-company-primary">Transformation</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Delivering innovative IT solutions to help businesses grow, optimize operations, and gain competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-company-primary hover:bg-company-secondary text-white"
                size="lg"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request A Consultation
              </Button>
              <Button 
                variant="outline" 
                className="border-company-primary text-company-primary hover:bg-company-primary hover:text-white"
                size="lg"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  aboutSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-full h-72 md:h-96 bg-gradient-to-tr from-company-primary to-company-secondary rounded-xl shadow-xl overflow-hidden animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="absolute inset-0 opacity-20 bg-grid-white/20"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  <h3 className="text-xl font-semibold mb-2">Enterprise IT Solutions</h3>
                  <p className="text-sm opacity-80">Providing scalable technologies to meet your business needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
