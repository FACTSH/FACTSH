// Heading.js
import React from 'react';
import './Heading.css';

const Heading = ({ content, eyebrow }) => {
  return (
    <div className="heading-container">
      {eyebrow && <div className="heading-eyebrow">{eyebrow}</div>}
      <h2 className="heading-content">{content}</h2>
      <div className="heading-rule"></div>
    </div>
  );
};

export default Heading;
