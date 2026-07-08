import React from 'react';
import News from '../../Content/LatestNews';
import './newsscroll.css';

const NewsScroll = () => {
  return (
    <div className="news-scroll">
      <div className="panel-eyebrow">Latest</div>
      <div className="panel-title">Dispatches from the lab</div>
      <div className="scroll-wrap">
        <div className="scroll-rod"></div>
        <div className="scroll-parchment">
          <div className="scroll-head">Hear ye, hear ye</div>
          <div className="scroll-sub">Recent notes from FACTS-H Lab</div>
          <ul className="scroll-list">
            {News.map((item, index) => (
              <li key={index}>
                <a className="scroll-link" href={item.link} target="_blank" rel="noopener noreferrer">
                  <span className="scroll-seal"></span>
                  <span className="scroll-text">
                    <span className="scroll-title">{item.news}</span>
                  </span>
                  <span className="scroll-arrow">&#8599;</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="scroll-rod"></div>
      </div>
    </div>
  );
};

export default NewsScroll;
