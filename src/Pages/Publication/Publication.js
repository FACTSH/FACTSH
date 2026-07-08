import React from 'react';
import './publication.css'
import Heading from '../../components/Heading/Heading';
import papers from '../../Content/papers';
import acceptedPapers from '../../Content/acceptedPapers';

const PaperCard = ({ paper }) => {
  const hasLink = Boolean(paper.website);
  return (
    <div
      className={`paper-card ${hasLink ? 'clickable' : ''}`}
      onClick={hasLink ? () => window.open(paper.website, '_blank', 'noopener') : undefined}
    >
      <div className="paper-year">{paper.year}</div>
      <h3 className="paper-title">{paper.title}</h3>
      <p className="paper-authors">{paper.authors.join(", ")}</p>
      <div className="paper-meta">
        <span className="paper-venue">{paper.conference}</span>
        {paper.publisher && <span className="paper-publisher">{paper.publisher}</span>}
      </div>
    </div>
  );
};

const Publication = () => {
  return (
    <div className='pub-page'>
      <div className='pub'>
        <Heading eyebrow="Peer-reviewed" content="Publications" />
        <div className="paper-grid">
          {papers.map((paper, index) => (
            <PaperCard paper={paper} key={index} />
          ))}
        </div>
      </div>
      <div className='pub'>
        <Heading eyebrow="In press" content="Accepted Conference / Journal" />
        <div className="paper-grid">
          {acceptedPapers.map((paper, index) => (
            <PaperCard paper={paper} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publication;
