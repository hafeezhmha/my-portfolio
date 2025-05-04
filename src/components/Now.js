import React, { useState, useEffect } from "react";
import "../styles/Now.css";
import FadeInSection from "./FadeInSection";
import HeadsetIcon from "@material-ui/icons/Headset";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { currentFocus, lastUpdated, spotifyPlaylist, attribution } from "../data/nowPageData";

const Now = () => {
  const [upvotes, setUpvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    // Check if user has previously upvoted
    const voted = localStorage.getItem("hasUpvoted") === "true";
    setHasUpvoted(voted);
    
    // Get saved upvote count (in a real app, this would come from a database)
    const savedUpvotes = localStorage.getItem("upvoteCount");
    if (savedUpvotes) {
      setUpvotes(parseInt(savedUpvotes, 10));
    }
  }, []);

  const handleUpvote = (e) => {
    // Stop event propagation
    e.stopPropagation();
    e.preventDefault();
    
    console.log("Upvote button clicked!");
    
    if (!hasUpvoted) {
      const newUpvotes = upvotes + 1;
      setUpvotes(newUpvotes);
      setHasUpvoted(true);
      
      // Save to localStorage (in a real app, you'd save to a database)
      localStorage.setItem("upvoteCount", newUpvotes.toString());
      localStorage.setItem("hasUpvoted", "true");
      
      console.log("Upvote count updated to:", newUpvotes);
    } else {
      console.log("Already upvoted");
    }
  };

  return (
    <div id="now">
      <FadeInSection>
        <div className="now-content">
          <div className="now-intro">
            <h2>/ now</h2>
            <p className="now-subheading">what I'm diving into and focusing on right now</p>
            <p className="now-updated" title="Last updated">LAST_UPDATE: {lastUpdated}</p>
          </div>
          
          <ul className="now-list">
            {currentFocus.map((item, index) => (
              <FadeInSection delay={`${index * 100}ms`} key={index}>
                <li className="now-item" dangerouslySetInnerHTML={{ __html: item.content }}></li>
              </FadeInSection>
            ))}
          </ul>
          
          <div className="spotify-section">
            <div className="spotify-header">
              <HeadsetIcon className="spotify-icon" />
              <h3>Currently on repeat</h3>
            </div>
            <div className="spotify-content">
              <a 
                href={spotifyPlaylist.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-link"
              >
              </a>
              <iframe 
                title={`Spotify Embed: ${spotifyPlaylist.title}`}
                src={spotifyPlaylist.embedUrl}
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="spotify-iframe"
              ></iframe>
            </div>
          </div>
          
          <div className="now-footer">
            <p>{attribution.text} <a href={attribution.link} target="_blank" rel="noopener noreferrer">{attribution.link.replace('https://', '')}</a></p>
            
            <div className="upvote-corner">
              <div 
                className={`upvote-button-small ${hasUpvoted ? 'upvoted' : ''}`}
                onClick={handleUpvote}
                title={hasUpvoted ? "Thanks for the upvote!" : "Found this interesting? Give it an upvote!"}
                aria-label="Upvote this page"
                role="button"
                tabIndex={0}
                style={{ cursor: hasUpvoted ? 'default' : 'pointer' }}
              >
                <ArrowUpwardIcon className="upvote-icon-small" />
                <span className="upvote-count-small">{upvotes}</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Now; 