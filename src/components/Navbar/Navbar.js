import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from '../../assets/icons/logo1.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const getScrollTop = () => {
      const door = document.getElementById("pageDoor");
      const split = document.getElementById("splitContent");
      const doorTop = door ? door.scrollTop : 0;
      const splitTop = split ? split.scrollTop : 0;
      return Math.max(doorTop, splitTop, window.scrollY || 0);
    };
    const onScroll = () => setScrolled(getScrollTop() > 20);
    onScroll();
    const door = document.getElementById("pageDoor");
    const split = document.getElementById("splitContent");
    window.addEventListener("scroll", onScroll);
    if (door) door.addEventListener("scroll", onScroll);
    if (split) split.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (door) door.removeEventListener("scroll", onScroll);
      if (split) split.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`Navbar fixed-top ${scrolled ? "scrolled" : ""}`}>
      <Link to="/">
        <div className="nav-logo strong-text">
          <span className="nav-mark">
            <img src={logo} className="logo rounded-circle" alt="Logo" />
          </span>
          FACTS-H LAB
        </div>
      </Link>
      <div className={`nav-items ${isOpen ? "open" : ""} d-flex `}>
        <Link onClick={() => setIsOpen(!isOpen)} to="/home"><strong>Home</strong></Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/vision"><strong>Vision</strong></Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/news"><strong>News</strong></Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/fundproject"><strong>Projects</strong></Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/intern"><strong>Internship</strong></Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/publication"><strong>Publications</strong></Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/people"><strong>People</strong></Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/gallery"><strong>Gallery</strong></Link>
        <Link onClick={() => setIsOpen(!isOpen)} to="/contact"><strong>Contact</strong></Link>
      </div>
      <div className={`nav-toggle ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
