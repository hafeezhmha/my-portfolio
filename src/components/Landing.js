import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import FadeInSection from "./FadeInSection";
import LandingParticles from "./LandingParticles";
import BackToTop from "./BackToTop";
import "../styles/Landing.css";

function Landing() {
  const [typistKey, setTypistKey] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState("");
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  // Handle typist reset
  useEffect(() => {
    const timer = setTimeout(() => {
      setTypistKey(prevKey => prevKey + 1);
    }, 11000);
    
    return () => clearTimeout(timer);
  }, [typistKey]);

  // Handle custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${mousePosition.x}px`;
      cursorRef.current.style.top = `${mousePosition.y}px`;
    }
  }, [mousePosition]);

  const handlePortalHover = (isHovering) => {
    setIsHovering(isHovering);
    setCursorText(isHovering ? "explore" : "");
  };

  return (
    <div className="landing-wrapper">
      <div className="landing-container" ref={containerRef}>
        <div className="custom-cursor" ref={cursorRef}>
          <span className="cursor-text">{cursorText}</span>
        </div>
        
        <div className="landing-overlay"></div>
        <div className="landing-particles">
          <LandingParticles />
        </div>
        
        <div className="landing-content">
          <div className="landing-typist-wrapper">
            <Typist 
              key={typistKey}
              avgTypingDelay={120} 
              cursor={{ hideWhenDone: false, hideWhenDoneDelay: 1000, element: '|' }}
            >
              <span className="landing-title">
                welcome to <span className="landing-name">hafeez</span>'s world
              </span>
            </Typist>
          </div>
          
          <FadeInSection>
            <div className="landing-subtitle">
              <span className="code-element">{"<"}</span>
              <span className="code-word">machine learning engineer</span>
              <span className="code-element">{"/>"}</span>
            </div>
            
            <div className="landing-description">
              Exploring the intersection of artificial intelligence, 
              computer vision, and innovative design. 
              Creating intelligent solutions that make a difference.
            </div>
            
            <div className="landing-skills">
              <div className="skill-category">
                <h3>AI & Machine Learning</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Computer Vision</span>
                  <span className="skill-tag">Neural Networks</span>
                  <span className="skill-tag">Deep Learning</span>
                  <span className="skill-tag">TensorFlow</span>
                  <span className="skill-tag">PyTorch</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Development</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Data Science</span>
                </div>
              </div>
            </div>
            
            <div className="landing-quote">
              "Building the bridge between cutting-edge AI research and real-world applications."
            </div>
            
            <div className="landing-portal-container">
              <Link 
                to="/" 
                className="landing-portal"
                onMouseEnter={() => handlePortalHover(true)}
                onMouseLeave={() => handlePortalHover(false)}
              >
                <div className="portal-ring portal-ring-1"></div>
                <div className="portal-ring portal-ring-2"></div>
                <div className="portal-ring portal-ring-3"></div>
                <div className="portal-content">
                  <span className="portal-icon">➡️</span>
                  <span className="portal-text">{isHovering ? "Enter the Matrix" : "Discover My Portfolio"}</span>
                </div>
              </Link>
            </div>
            
            <div className="landing-contact">
              <a 
                href="mailto:hafeezhmha.dev@gmail.com" 
                className="contact-button"
                onMouseEnter={() => setCursorText("contact")}
                onMouseLeave={() => setCursorText("")}
              >
                <span className="contact-icon">✉️</span>
                <span>Get in Touch</span>
              </a>
            </div>
          </FadeInSection>
          
          <div className="landing-tagline">
            the future of ai is being built now
          </div>
          
          <div className="landing-social-links-wrapper">
            <div className="landing-social-links">
              <a 
                href="https://github.com/hafeezhmha" 
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorText("github")}
                onMouseLeave={() => setCursorText("")}
              >GitHub</a>
              <a 
                href="https://www.linkedin.com/in/hafeezhmha" 
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorText("linkedin")}
                onMouseLeave={() => setCursorText("")}
              >LinkedIn</a>
              <a 
                href="https://hafeez.bearblog.dev/now/" 
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorText("blog")}
                onMouseLeave={() => setCursorText("")}
              >Blog</a>
            </div>
          </div>
        </div>
        
        <BackToTop />
      </div>
    </div>
  );
}

export default Landing; 