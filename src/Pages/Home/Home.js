import React from "react";
import { Link } from "react-router-dom";
import Hero3D from "../../components/Hero3D/Hero3D";
import "./home.css";

function Home() {
  return (
    <div className="home">
      {/* ---- Hero (3D emblem) — the whole of the Home page ---- */}
      <section id="hero">
        <Hero3D />
        <div className="hero-content wrap">
          <div className="eyebrow">Interpretability &amp; responsible AI research</div>
          <h1 className="hero-title">
            Every decision leaves <em>a path.</em><br />We trace it.
          </h1>
          <p className="hero-sub">
            FACTS-H Lab studies how AI systems arrive at their decisions — and works
            with the humanities and social sciences to make sure those decisions
            answer to the people they affect.
          </p>
          <div className="hero-cta">
            <Link to="/vision" className="btn-gold">Our vision</Link>
            <Link to="/news" className="btn-ghost">Latest from the lab</Link>
          </div>
        </div>
        <div className="hero-foot">
          <div className="hero-foot-brand">FACTS-H Lab</div>
          <nav className="hero-foot-links">
            <Link to="/vision">Vision</Link>
            <Link to="/news">News</Link>
            <Link to="/fundproject">Research</Link>
            <a href="mailto:factsh@iiitkottayam.ac.in">Email</a>
          </nav>
          <div className="hero-foot-copy">© {new Date().getFullYear()} FACTS-H Lab</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
