import React, { useEffect, useRef, useState } from 'react';
import ProfileData from '../../Content/ProfileData';
import './peoplewheel.css';

function initials(name) {
  return name
    .replace(/^Dr\.?\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

// Real faculty + PhD scholars feed the wheel; a couple of open seats keep the
// "join us" invitation from the reference design.
function buildWheelData() {
  const faculty = (ProfileData.Faculty || []).map((p) => ({
    name: p.name,
    initial: initials(p.name),
    role: p.position || p.designation || '',
    affil: p.designation || '',
    placeholder: false,
  }));
  const scholars = (ProfileData.PhDScholars || []).map((p) => ({
    name: p.name,
    initial: initials(p.name),
    role: p.position || 'PhD Scholar',
    affil: p.designation || '',
    placeholder: false,
  }));
  const openSeats = [
    { name: 'Open seat', initial: '+', role: 'Prospective PhD student', affil: '', placeholder: true },
    { name: 'Open seat', initial: '+', role: 'Prospective collaborator', affil: '', placeholder: true },
    { name: 'Open seat', initial: '+', role: 'Prospective intern', affil: '', placeholder: true },
  ];
  const data = [...faculty, ...scholars, ...openSeats];
  return data.length ? data : openSeats;
}

const PeopleWheel = () => {
  const wheelRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [peopleData] = useState(buildWheelData);

  useEffect(() => {
    const wheelEl = wheelRef.current;
    if (!wheelEl) return;
    const n = peopleData.length, radius = 190, cx = 190, cy = 190;
    const tiles = wheelEl.querySelectorAll('.wheel-tile');
    tiles.forEach((tile, i) => {
      const angle = (Math.PI * 2 * (i - currentIndex)) / n + Math.PI / 2;
      tile.style.left = cx + radius * Math.cos(angle) + 'px';
      tile.style.top = cy + radius * Math.sin(angle) + 'px';
      tile.classList.toggle('featured', i === currentIndex);
    });
  }, [currentIndex, peopleData]);

  const step = (dir) => {
    setCurrentIndex((prev) => (prev + dir + peopleData.length) % peopleData.length);
  };

  const current = peopleData[currentIndex];

  return (
    <div className="people-wheel">
      <div className="panel-eyebrow">People</div>
      <div className="panel-title">The people behind it</div>
      <p className="panel-sub">Click a tile, or use the arrows, to bring someone new to the front.</p>
      <div className="wheel-clip">
        <div className="wheel" ref={wheelRef}>
          {peopleData.map((p, i) => (
            <div
              key={i}
              className={`wheel-tile ${p.placeholder ? 'placeholder' : ''} ${i === currentIndex ? 'featured' : ''}`}
              onClick={() => setCurrentIndex(i)}
            >
              <div className="wt-avatar">{p.initial}</div>
              <div className="wt-name">{p.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="wheel-controls">
        <button className="wheel-arrow" type="button" aria-label="Previous" onClick={() => step(-1)}>&#8592;</button>
        <button className="wheel-arrow" type="button" aria-label="Next" onClick={() => step(1)}>&#8594;</button>
      </div>
      <div className="wheel-panel">
        <h3>{current.name}</h3>
        <div className="role">{current.role}</div>
        {current.affil && <div className="affil">{current.affil}</div>}
      </div>
    </div>
  );
};

export default PeopleWheel;
