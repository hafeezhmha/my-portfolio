import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  render() {
    const one = (
      <p>
        I am a <b>Machine Learning Engineer</b> specializing in{" "}
        <button className="text-link">AI systems & Full Stack Applications</button>. My expertise spans 
        Computer Vision, Machine Learning, and Generative AI, with a focus on making neural 
        networks both intelligent and practical.
      </p>
    );
    
    const two = (
      <p>
        I transform complex AI concepts into tangible solutions, drawing from my unique background 
        in geospatial technology. Whether it's optimizing PyTorch models, experimenting with 
        vision transformers, or building full-stack applications, I bring AI from theory to 
        real-world impact.
      </p>
    );

    const personal = (
      <p className="personal-story">
        My fascination with pattern recognition in images sparked my journey from traditional 
        software development to AI. Outside coding, I find inspiration in nature walks and chess, 
        both helping me approach complex problems from fresh perspectives. I'm passionate about 
        democratizing AI technology to solve meaningful real-world challenges.
      </p>
    );

    const goals = (
      <p className="personal-goals">
        <b>My vision:</b> I thrive at the intersection of different knowledge domains, creating 
        innovative solutions by combining disparate fields. I'm working toward building vision systems 
        with human-like understanding while maintaining computational efficiency. My aim is to contribute 
        to open-source projects that make powerful AI tools accessible to developers worldwide.
      </p>
    );

    const tech_stack = [
      "Python",
      "PyTorch",
      "Computer Vision Models",
      "Large Language Models (LLMs)",
      "Version Control (Git)",
      "HTML5/CSS3/JavaScript",
      "Tailwindcss",
      "Langchain & Streamlit",
      "NumPy & Pandas",
      "Diffusion Models",
      "OCR & QGIS",
      "Docker",
      "AWS Services",
      "Hugging Face"
    ];

    return (
      <div id="about">
        <FadeInSection>
          <div className="section-header ">
            <span className="section-title">/ about me</span>
          </div>
          <div className="about-content">
            <div className="about-description">
              {[one]}
              {[two]}
              {[personal]}
              {[goals]}
              {"Here are some technologies I specialize in:"}
              <ul className="tech-stack">
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${Math.min(i * 50, 400)}ms`} key={i}>
                      <li>{tech_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default About;
