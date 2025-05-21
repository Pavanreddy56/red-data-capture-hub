
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50 animate-fade-in">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-company-primary rounded-md w-10 h-10 flex items-center justify-center text-white font-bold mr-3">
            CP
          </div>
          <div>
            <h1 className="text-xl font-bold text-company-dark">C.P REDDY IT SOLUTIONS</h1>
            <p className="text-xs text-gray-500">Innovative Technology Solutions</p>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#services" className="text-gray-600 hover:text-company-primary transition-colors">Services</a>
          <a href="#about" className="text-gray-600 hover:text-company-primary transition-colors">About</a>
          <a href="#contact" className="text-gray-600 hover:text-company-primary transition-colors">Contact</a>
        </nav>
        <Button 
          variant="default" 
          className="hidden md:inline-flex bg-company-primary hover:bg-company-secondary"
          onClick={() => {
            const contactSection = document.getElementById('contact');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Get In Touch
        </Button>
        <Button 
          variant="ghost" 
          className="md:hidden" 
          size="sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </Button>
      </div>
    </header>
  );
};

export default Header;
