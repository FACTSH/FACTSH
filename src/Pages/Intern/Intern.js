import React, { useState } from 'react';
import './intern.css';
import faqData from '../../Content/faqData';

const thrustAreas = [
  'Responsible AI',
  'Digital Humanities',
  'Data Privacy & Security',
  'Explainable Machine Learning',
  'Cultural Analytics',
];

const facultyMentors = [
  { name: 'Dr. Ebin Deni Raj', phone: '0482-2202195' },
  { name: 'Dr. Arun Cyril Jose', phone: '0482-2202159' },
  { name: 'Dr. Divya Sindhu Lekha', phone: '0482-2202161' },
  { name: 'Dr. Gayathri G. R', phone: '0482-2202184' },
  { name: 'Dr. Jayakrushna Sahoo', phone: '0482-2202190' },
  { name: 'Dr. Josit Mariya', phone: '0482-2202203' },
  { name: 'Dr Jeena Thomas', phone: '0482-2202278' },
  { name: 'Dr Sara Renjit', phone: '0482-2202299' },
  { name: 'Dr Sushitha Susan Joseph', phone: '0482-2202257' },
  { name: 'Dr Ansith S', phone: '0482-2202229' },
];

const quickFacts = [
  { label: 'Mode', value: 'Hybrid' },
  { label: 'Duration', value: '8–12 weeks' },
  { label: 'Undergraduate', value: 'B.Tech / B.E / B.Sc / BCA / B.A' },
  { label: 'Postgraduate', value: 'M.Tech / ME / M.Sc / MCA / MA' },
];

const Internship = () => {
  return (
    <div className="intern-page">
      <div className="panel-eyebrow">Applications open</div>
      <div className="panel-title">Summer Internship 2026</div>
      <p className="intern-lead">
        "FACTS-H" emphasizes a fact-based, ethical approach, integrating key
        principles of fairness, accountability, and transparency in computing,
        while acknowledging the critical role of sociology and humanities.
      </p>

      <div className="intern-cta">
        <a className="btn-gold" href="https://forms.gle/EybnTZ5VoMzZaY2R9" target="_blank" rel="noopener noreferrer">Apply now</a>
        <a className="btn-ghost" href="https://www.onlinesbi.sbi/sbicollect/" target="_blank" rel="noopener noreferrer">Pay now</a>
      </div>
      <p className="intern-payment-hint">
        Educational Institute &#8594; IIIT Kottayam &#8594; Summer Internship 2026 FACTS-H Lab
      </p>

      <div className="quick-facts">
        {quickFacts.map((f, i) => (
          <div className="fact-card" key={i}>
            <div className="fact-label">{f.label}</div>
            <div className="fact-value">{f.value}</div>
          </div>
        ))}
      </div>

      <div className="intern-block">
        <h3>Thrust Areas</h3>
        <div className="tag-row">
          {thrustAreas.map((t, i) => (
            <span className="thrust-tag" key={i}>{t}</span>
          ))}
        </div>
      </div>

      <div className="intern-block highlight-block">
        <h3>Benefits</h3>
        <p>
          Internships offer scholarships, participation in FACTS-H Lab's
          international projects, access to its high-end computing facility,
          and a certificate upon completion.
        </p>
      </div>

      <div className="intern-block">
        <h3>Faculty Mentors</h3>
        <div className="mentor-grid">
          {facultyMentors.map((m, i) => (
            <div className="mentor-card" key={i}>
              <div className="mentor-name">{m.name}</div>
              <div className="mentor-phone">{m.phone}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="intern-block contact-block">
        <h3>Contact</h3>
        <p>Reach us at <a href="mailto:factsh@iiitkottayam.ac.in">factsh@iiitkottayam.ac.in</a></p>
      </div>
    </div>
  );
};

function FAQ({ faqData }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="accordion" id="faqAccordion">
      {faqData.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className={`accordion-button ${activeIndex === index ? '' : 'collapsed'}`}
              type="button"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index ? 'true' : 'false'}
              aria-controls={`collapse${index}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
            aria-labelledby={`heading${index}`}
          >
            <div className="accordion-body">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Intern() {
  return (
    <div className="intern-container">
      <Internship />
      <div className="faq-section">
        <div className="panel-eyebrow">Questions</div>
        <div className="panel-title">Internship FAQs</div>
        <FAQ faqData={faqData} />
      </div>
    </div>
  );
}

export default Intern;
