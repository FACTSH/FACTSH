import React from 'react';
import NewsScroll from '../../components/NewsScroll/NewsScroll';
import slides from '../../Content/slide';
import './news.css';

const News = () => {
  return (
    <div className="news-page">
      <NewsScroll />

      <div className="snapshots-block">
        <div className="panel-eyebrow">From the lab</div>
        <div className="panel-title">Snapshots</div>
        <div className="snapshots-list">
          {slides.map((slide, index) => (
            <div className="snapshot-item" key={index}>
              <img
                src={require(`../../assets/images/${slide.name}`)}
                alt={`Snapshot ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
