import React, { useState } from 'react';
import Heading from '../../components/Heading/Heading';
import './intern.css';
import faqData from '../../Content/faqData';


const Internship = () => {
  return (
    <div className="page-container">
      <h1 className="text-center my-4"> Call for Summer Internships 2025 FACTS-H Lab</h1>
      {/* <h5 className="text-center">Fair and Accountable, Computing solutions that are Transparent with Sociological and Humanistic Insights</h5> */}
      
      
      
      <div className="section">
          <h4 className="text-center">"FACTS-H' emphasizes a fact-based, ethical approach, integrating key principles of fairness, accountability, and transparency in computing, while also acknowledging the critical role of sociology and humanities.</h4>
        </div>
      <div className="left-column">
        <div className="section">
          <h3>Thrust Areas</h3>
          <ul>
            <li>Responsible AI</li>
            <li>Digital Humanities</li>
            <li>Data Privacy and Security</li>
            <li>Explainable Machine Learning</li>
            <li>Cultural Analytics</li>
          </ul>
        </div>
        <div className="section">
          <h3>Faculty</h3>
          <ul>
            <li>Dr. Ebin Deni Raj (0482-2202195)</li>
            <li>Dr. Arun Cyril Jose (0482-2202159)</li>
            <li>Dr. Divya Sindhu Lekha (0482-2202161)</li>
            <li>Dr. Gayathri G. R (0482-2202184)</li>
            <li>Dr. Jayakrushna Sahoo (0482-2202190)</li>
            <li>Dr. Josit Mariya (0482-2202203)</li>
          </ul>
        </div>
        <div className="section">
          <h3>Benefits</h3>
          <ul>
            <li>Internships offer scholarships, participation in FACTS-H Lab's international projects, access to its high-end computing facility, and a certificate upon completion.</li>
            {/* <li>Best internships (evaluated on outcome basis) will be provided scholarships</li>
            <li>Opportunity to be part of International projects of FACTS-H Lab</li>
            <li>Access to use the High-end computing facility in FACTS-H LAB.</li>
            <li>You will get the certificate for the internship</li> */}
          </ul>
        </div>
      </div>
      <div className="right-column">
        <div className="section">
          <h3>Eligibility Criteria</h3>
          <ul>
            <li>Undergraduate: B.Tech./B.E./B.Sc./BCA/B.A</li>
            <li>Postgraduate: M.Tech./ME/MSc./MCA/MA</li>
          </ul>
        </div>
        <div className="section">
          <h3>Internship Details</h3>
          <ul>
            <li>Mode of Internship: Hybrid</li>
            <li>Duration: 8 to 12 weeks</li>
            {/* <li>Application Deadline: 5 April 2024</li> */}
            {/* <li>Internship Commences on: 22 April 2024</li> */}
            {/* <li>Internship fee: 5000/-</li> */}
            <li>Payment link: <a href="https://www.onlinesbi.sbi/sbicollect/">Pay&nbsp;Now</a></li>
            <li>(Educational Institute &#8594; III KOTTAYAM &#8594; Summer Internship 2024 FACTS-H Lab )</li>
          </ul>
        </div>
        <div className="section">
          <h3>Registration link</h3>
          <div className="brcode">
          {/* <img src={barcode} alt="img not available"/>  */}
          <a href="https://forms.gle/fwVSasnN84259bZq5">Apply&nbsp;Now</a>
          </div>
        </div>
        <div className="section">
          <h3>Contact</h3>
          <p>Reach us: <a href="mailto:factsh@iiiitkottayam.ac.in">factsh@iiiitkottayam.ac.in</a></p>
        </div>
      </div>
    </div>
  );
};

function FAQ({ faqData }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      // If clicked again on the same item, collapse it
      setActiveIndex(null);
    } else {
      // Otherwise, expand the clicked item
      setActiveIndex(index);
    }
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
            data-bs-parent="#faqAccordion"
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
    <div className="container">
      <Heading content="Internship"/>
      <Internship />
      <Heading content="Internship FAQs"/>
      <FAQ faqData={faqData} />
    </div>
  );
}

export default Intern;
