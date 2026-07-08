import React from 'react';
import './fundproject.css';
import Heading from '../../components/Heading/Heading';
import fundProjects from '../../Content/fundprojects';
import collaborator from '../../Content/collaborator';

const FundProject = () => {
  return (
    <div className='pro'>
      <Heading eyebrow="Partners" content="Collaborators" />
      <div className="collaborator-container">
        {collaborator.map((data, index) => (
          <div className="collab-card" key={index}>
            <img className='collab' src={require(`../../assets/icons/${data.image}`)} alt={data.name} />
          </div>
        ))}
      </div>

      <Heading eyebrow="Research funding" content="Funded Projects" />
      <div className="project-grid">
        {fundProjects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-card-top">
              <span className="project-tag">{project.fundingAgency}</span>
              <span className="project-amount">{project.amount}</span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <div className="project-duration">{project.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundProject;
