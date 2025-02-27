// Contact.js

import React,{ useState, useEffect } from 'react';
import './contact.css';


const Contact = () => {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []); 
  return (
    <>
   
    <div className="responsivemap">
   
    <iframe className={`z-${showMap?"1":"n1"}`} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.1281096051857!2d76.64747697486806!3d9.755214590338058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07ce23bc170053%3A0x8757971e61eb21dd!2sIndian%20Institute%20of%20Information%20Technology%20(IIIT)%20Kottayam!5e0!3m2!1sen!2sin!4v1711010885065!5m2!1sen!2sin" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div className="contact-container">
      <div className="contact-card">
        <h2>FACTS&minus;H&nbsp;Lab</h2>
        <div className="contact-info">
          <p><strong>Phone:</strong> +91-0482-2202195 </p>
          <p><strong>Email:</strong> factsh@iiitkottayam.ac.in </p>
          <p>Indian Institute of Information Technology Kottayam,</p>
          <p>Valavoor.P.O, Pala, Kottayam,</p>
          <p>Kerala, India-686635</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
