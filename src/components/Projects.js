import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";
import { Carousel } from "react-bootstrap";

class Projects extends React.Component {
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
    const projects = {
      "AI Web Researcher": {
        desc:
          "A Windows-optimized research assistant that leverages locally-run LLMs through Ollama to conduct thorough, automated online research. It breaks down queries into focused areas, performs systematic web searching and scraping, compiles findings into documented research, and provides comprehensive summaries with source attribution.",
        techStack: "Python, Ollama, LangChain, BeautifulSoup, Windows Optimization",
        link: "https://github.com/hafeezhmha/Automated-AI-Web-Researcher-Ollama",
        open: "#",
        image: process.env.PUBLIC_URL + "/assets/automated-researcher.png"
      },
      "Aura": {
        desc:
          "A multilingual real-time transliteration system supporting major Indic languages including Hindi, Kannada, Bengali, and more. Features real-time processing, user-friendly interface, and customization options for themes and configurations.",
        techStack: "Python, NLP, Machine Learning, Streamlit",
        link: "https://github.com/hafeezhmha/Aura",
        open: "https://aura-transliterate.streamlit.app/",
        image: process.env.PUBLIC_URL + "/assets/aura-demo.png"
      },
      "Gradient Descent Visualization": {
        desc:
          "An interactive visualization tool for understanding gradient descent algorithm. Features multiple function selections (Quadratic, Cubic, Sinusoidal, Exponential), real-time updates of values, and dynamic controls for learning rate and iterations.",
        techStack: "Python, Streamlit, Mathematical Visualization, Interactive Plotting",
        link: "#",
        open: "https://gradient-descent-visual.streamlit.app/",
        image: process.env.PUBLIC_URL + "/assets/gradient-descent-demo.png"
      }
    };

    return (
      <div id="projects">
        <div className="section-header ">
          <span className="section-title">/ projects</span>
        </div>

        <Carousel className="project-carousel">
          {Object.keys(projects).map((key, i) => (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src={projects[key].image}
                alt={key}
              />
              <Carousel.Caption>
                <h3>{key}</h3>
                <p>{projects[key].desc}</p>
                <p className="techStack">{projects[key].techStack}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="project-container">
          <ul className="projects-grid">
            {Object.keys(projects).map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`} key={i}>
                <li className="projects-card">
                  <div className="card-header">
                    <div className="folder-icon">
                      <FolderOpenRoundedIcon
                        style={{ fontSize: 35 }}
                      ></FolderOpenRoundedIcon>
                    </div>
                    <ExternalLinks
                      githubLink={projects[key]["link"]}
                      openLink={projects[key]["open"]}
                    ></ExternalLinks>
                  </div>

                  <div className="card-title">{key}</div>
                  <div className="card-desc">{projects[key]["desc"]}</div>
                  <div className="card-tech">{projects[key]["techStack"]}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Projects; 