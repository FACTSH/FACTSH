import React, { useState } from 'react';
import linkedinIcon from '../../assets/icons/linkedin1.svg';
import mailIcon from '../../assets/icons/mail1.svg';
import './categorycarousel.css';

function avatarSrc(image) {
  const file = image && image.length > 0 ? image : 'avatar.png';
  try {
    return require(`../../assets/profile/${file}`);
  } catch (e) {
    return require('../../assets/profile/avatar.png');
  }
}

const CategoryCarousel = ({ title, people }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const n = people.length;
  if (n === 0) return null;

  const mod = (i) => ((i % n) + n) % n;
  const prevIndex = mod(currentIndex - 1);
  const nextIndex = mod(currentIndex + 1);
  const current = people[currentIndex];

  const step = (dir) => setCurrentIndex((prev) => mod(prev + dir));

  const SideSlide = ({ person, role, onClick }) => (
    <button type="button" className={`carousel-slide ${role}`} onClick={onClick} aria-label={person.name}>
      <img className="slide-avatar" src={avatarSrc(person.image)} alt={person.name} />
    </button>
  );

  return (
    <div className="category-row">
      <div className="category-label">
        <span className="eyebrow">People</span>
        <h2 className="category-title">{title}</h2>
        <span className="category-count">{n} {n === 1 ? 'member' : 'members'}</span>
      </div>

      <div className="category-carousel">
        <button type="button" className="carousel-arrow left" aria-label="Previous" onClick={() => step(-1)}>&#8592;</button>

        <div className="carousel-track">
          <div className="carousel-bar left-bar"></div>
          {n > 2 && <SideSlide person={people[prevIndex]} role="prev" onClick={() => step(-1)} />}

          <div className="carousel-slide current">
            <img className="slide-avatar" src={avatarSrc(current.image)} alt={current.name} />
            <div className="slide-info">
              <div className="slide-name">
                {current.linkedin ? (
                  <a href={current.linkedin} target="_blank" rel="noopener noreferrer">{current.name}</a>
                ) : current.name}
              </div>
              <div className="slide-role">{current.position || current.designation}</div>
              {Array.isArray(current.research) && current.research.length > 0 && (
                <div className="slide-tags">
                  {current.research.map((tag, i) => (
                    <span className="slide-tag" key={i}>{tag}</span>
                  ))}
                </div>
              )}
              {(current.linkedin || current.email) && (
                <div className="slide-social">
                  {current.linkedin && (
                    <a href={current.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <img src={linkedinIcon} alt="LinkedIn" />
                    </a>
                  )}
                  {current.email && (
                    <a href={`mailto:${current.email}`} aria-label="Email">
                      <img src={mailIcon} alt="Email" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {n > 1 && <SideSlide person={people[nextIndex]} role="next" onClick={() => step(1)} />}
          <div className="carousel-bar right-bar"></div>
        </div>

        <button type="button" className="carousel-arrow right" aria-label="Next" onClick={() => step(1)}>&#8594;</button>
      </div>
    </div>
  );
};

export default CategoryCarousel;
