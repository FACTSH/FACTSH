import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import './doorshell.css';

const DoorShell = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.toLowerCase();
  const isHome = path === '/' || path === '/home';

  return (
    <div id="appShell">
      <div id="pageDoor" className={isHome ? '' : 'is-split'}>
        <div className="door-hinges"><span></span><span></span><span></span></div>
        <div className="door-handle"></div>
        <Home />
      </div>
      <aside id="splitPanel" className={isHome ? '' : 'open'}>
        <button
          className="panel-close"
          type="button"
          aria-label="Close"
          onClick={() => navigate('/')}
        >
          &times;
        </button>
        <div id="splitContent">
          {!isHome && children}
        </div>
      </aside>
    </div>
  );
};

export default DoorShell;
