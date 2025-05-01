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
        I am a <b>Machine Learning Engineer</b> focused on bringing{" "}
        <button className="text-link">AI systems & Full Stack Applications</button> to life. I specialize in 
        Computer Vision, Machine Learning, and Generative AI, working to make neural 
        networks more intelligent and practical.
      </p>
    );
    const two = (
      <p>
        What drives me is taking complex AI concepts and turning them into tangible solutions. 
        My background in geospatial tech has given me a unique perspective on how different 
        technologies can come together to create impactful solutions. You'll find me deep in 
        PyTorch code, experimenting with vision transformers, or architecting full-stack 
        applications that put AI to work.
      </p>
    );

    const tech_stack = [
      "Python",
      "PyTorch",
      "Computer Vision Models",
      "Large Language Models (LLMs)",
      "Version Control (Git)",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwindcss",
      "Anaconda",
      "Groq",
      "Langchain",
      "Streamlit , Gradio",
      "NumPy",
      "Pandas",
      "Diffusion Models (Flux, Wan 2.1)",
      "OCR",
      "QGIS",
      "Docker",
      "ComfyUI",
      "Replicate & Cog",
      "AWS Lamdbda/S3",
      "Lovable AI",
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
              {"Here are some technologies I specialize in:"}
              <ul className="tech-stack">
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`} key={i}>
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
