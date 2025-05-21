
import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-company-dark mb-4">About C.P REDDY IT SOLUTIONS</h2>
          <div className="w-20 h-1 bg-company-primary mx-auto mb-6"></div>
          <p className="text-gray-600">
            We are a premier IT solutions provider offering comprehensive technology services to businesses of all sizes. 
            With our expert team and innovative approaches, we help organizations achieve their strategic objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path><path d="M18 22H6"></path><circle cx="12" cy="10" r="1"></circle></svg>
              ),
              description: "To empower businesses through technology by providing innovative IT solutions that drive growth and efficiency."
            },
            {
              title: "Our Vision",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ),
              description: "To be recognized as a leader in delivering advanced IT services that transform businesses across industries."
            },
            {
              title: "Our Values",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="m7 11 2-2-2-2"></path><path d="M11 13h4"></path><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
              ),
              description: "Excellence, integrity, innovation, client-centricity and adaptability are the core principles that guide our operations."
            }
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="text-company-primary group-hover:text-company-secondary transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-company-dark mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
