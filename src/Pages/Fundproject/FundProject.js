import React from 'react';
import './fundproject.css';
import Heading from '../../components/Heading/Heading';
import fundProjects from '../../Content/fundprojects';
import collaborator from '../../Content/collaborator';

const FundProject = () => {
  return (
    <div className='pro'>
      <Heading content="COLLABORATORS"/>
      <div className="collaborator-container">
        {collaborator.map((data, index) => (
          <img className='collab' key={index} src={require(`../../assets/icons/${data.image}`)} alt="Collaborator Logo" /> 
        ))}
      </div>
      <Heading content="Funded Projects"/>
      <div className="table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>Funding Agency</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {fundProjects.map((project, index) => (
              <tr key={index}>
                <td>{project.fundingAgency}</td>
                <td>{project.title}</td>
                <td>{project.amount}</td>
                <td>{project.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundProject;
