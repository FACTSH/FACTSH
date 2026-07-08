import React from 'react';
import './vision.css';
import OrbitVision from '../../components/OrbitVision/OrbitVision';
import ObjectiveData from '../../Content/objective';
import ObjectiveCard from '../../components/ObjectiveCard/ObjectiveCard';

const researchInterests = ObjectiveData.find((o) => o.title === "Research Interests");
const pillars = (researchInterests ? researchInterests.description : []).map((point) => {
  const [head, ...rest] = point.split(":");
  return { code: head.trim(), desc: rest.join(":").trim() || head.trim() };
});

const Vision = () => {
  return (
    <div className="vision-page">
      <OrbitVision />

      <div className="research-block">
        <div className="panel-eyebrow">Research</div>
        <div className="panel-title">What we work on</div>
        <div className="pillars-grid">
          {pillars.map((p, index) => (
            <div className="pillar-card" key={index}>
              <div className="pillar-code">{String(index + 1).padStart(2, "0")}</div>
              <h3>{p.code}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="lab-info objectives-strip">
          {ObjectiveData.map((item, index) => (
            <ObjectiveCard key={index} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vision;
