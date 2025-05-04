import React, { useState, useEffect } from "react";
import "../styles/Blog.css";
import FadeInSection from "./FadeInSection";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EventNoteIcon from '@material-ui/icons/EventNote';
import ScheduleIcon from '@material-ui/icons/Schedule';

const Blog = () => {
  // Create a separate state for each blog post
  const [expandedPost0, setExpandedPost0] = useState(false);
  const [expandedPost1, setExpandedPost1] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [notified, setNotified] = useState(false);

  // Effect to ensure body classes are cleaned up
  useEffect(() => {
    // When component mounts, make sure overflow is enabled
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
    
    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Effect to handle body class when modal opens/closes
  useEffect(() => {
    if (showComingSoonModal) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    }
  }, [showComingSoonModal]);

  const blogPosts = [
    {
      title: "Optimizing LLM Prompts for Research Tasks",
      date: "June 2023",
      summary:
        "My journey into prompt engineering for research automation, including challenges faced and solutions discovered when building the AI Web Researcher project.",
      content:
        "When I started building my AI Web Researcher project, I quickly discovered that the quality of prompts given to LLMs makes a dramatic difference in research output. Through experimentation, I found that decomposing complex research questions into multiple focused queries yields more accurate and comprehensive results. My approach involves a three-layer prompt hierarchy: (1) a strategic prompt to plan the research, (2) tactical prompts to gather specific information, and (3) synthesis prompts to combine findings into coherent insights. This structure helped overcome the tendency of LLMs to hallucinate or over-generalize when tackling broad topics. A key insight was that providing explicit constraints and evaluation criteria within prompts significantly improves factual accuracy. My next challenge is implementing retrieval-augmented generation to ground responses more firmly in verified sources.",
      tags: ["LLMs", "Prompt Engineering", "Research"],
      estimatedReadTime: "8 min",
      scheduledRelease: "June 2025"
    },
    {
      title: "The Evolution of My Computer Vision Workflow",
      date: "April 2023",
      summary:
        "How my approach to computer vision projects has evolved over time, with lessons on model selection, dataset preparation, and deployment strategies.",
      content:
        "My computer vision workflow has undergone a significant transformation over the past year. I've moved from a model-centric approach (where I focused primarily on architecture selection) to a data-centric methodology that prioritizes data quality and preprocessing. This shift came after countless hours of tweaking model architectures only to realize that well-prepared data often yields better improvements than architectural changes. My current workflow now starts with extensive exploratory data analysis to understand class distributions and identify potential biases. For preprocessing, I've developed a pipeline that applies targeted augmentations based on dataset weaknesses rather than generic transformations. I've also embraced failure analysis as a core part of my iteration cycle, systematically categorizing and addressing error patterns. The most valuable lesson has been learning when to leverage transfer learning vs. training from scratch—a decision that depends not just on dataset size but also on domain similarity and specific task requirements.",
      tags: ["Computer Vision", "Data-Centric AI", "Model Training"],
      estimatedReadTime: "10 min",
      scheduledRelease: "August 2025"
    }
  ];

  const handleCloseComingSoonModal = (e) => {
    // If called from an event, prevent default and stop propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setShowComingSoonModal(false);
    setSelectedPost(null);
    setNotified(false);
  };
  
  const handleNotifyClick = (e) => {
    // Prevent default button behavior
    e.preventDefault();
    // Show confirmation
    setNotified(true);
    // Here you would normally send the notification request to a server
    console.log("Notification requested for:", selectedPost?.title);
  };

  // Create independent blog card components
  const BlogCard = ({ post, expanded, setExpanded, index }) => {
    return (
      <div className={`blog-card ${expanded ? 'expanded' : ''}`}>
        <div className="blog-card-header">
          <span className="blog-card-date">{post.date}</span>
          <div className="blog-tags">
            {post.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="blog-tag">{tag}</span>
            ))}
          </div>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-summary">{post.summary}</p>
        
        <div className="blog-card-actions">
          <button 
            className="expand-button" 
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <span>Show Less</span>
                <ExpandMoreIcon className="expand-icon rotate-up" />
              </>
            ) : (
              <>
                <span>Show More</span>
                <ExpandMoreIcon className="expand-icon" />
              </>
            )}
          </button>
        </div>
        
        {expanded && (
          <div className="blog-card-content">
            <p>{post.content}</p>
          </div>
        )}
      </div>
    );
  };

  // Coming Soon Modal - Simplified to avoid scrolling
  const ComingSoonModal = ({ post, onClose }) => {
    if (!post) return null;
    
    const handleOverlayClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose(e);
    };
    
    const handleModalClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    return (
      <div 
        className="modal-overlay" 
        onClick={handleOverlayClick}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose(e);
        }}
      >
        <div 
          className="coming-soon-modal" 
          onClick={handleModalClick}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="modal-header">
            <h3>{post.title}</h3>
            <div className="modal-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="modal-tag">{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="modal-content">
            <div className="modal-message">
              <p>Full article coming soon</p>
              <div className="modal-info-compact">
                <div className="info-item">
                  <ScheduleIcon className="modal-info-icon" /> {post.estimatedReadTime}
                </div>
                <div className="info-item">
                  <EventNoteIcon className="modal-info-icon" /> {post.scheduledRelease}
                </div>
              </div>
            </div>
            
            <button 
              className={`notify-button ${notified ? 'notified' : ''}`}
              onClick={handleNotifyClick}
              disabled={notified}
            >
              {notified ? 'You will be notified' : 'Notify me when published'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="blog">
      <FadeInSection>
        <div className="section-header ">
          <span className="section-title">/ insights</span>
        </div>
        <div className="blog-grid">
          {/* First Blog Post */}
          <FadeInSection delay="100ms">
            <BlogCard 
              post={blogPosts[0]} 
              expanded={expandedPost0} 
              setExpanded={setExpandedPost0}
              index={0}
            />
          </FadeInSection>

          {/* Second Blog Post */}
          <FadeInSection delay="200ms">
            <BlogCard 
              post={blogPosts[1]} 
              expanded={expandedPost1} 
              setExpanded={setExpandedPost1}
              index={1}
            />
          </FadeInSection>
        </div>
      </FadeInSection>
      
      {showComingSoonModal && selectedPost && (
        <ComingSoonModal post={selectedPost} onClose={handleCloseComingSoonModal} />
      )}
    </div>
  );
};

export default Blog; 