import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import StarIcon from "@material-ui/icons/Star";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";
import { Carousel } from "react-bootstrap";

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
      repoStats: {}
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.fetchGitHubStats();
  }

  fetchGitHubStats() {
    // Only fetch stars for the AI Web Researcher project
    const repos = [
      "hafeezhmha/Automated-AI-Web-Researcher-Ollama"
    ];

    repos.forEach(repo => {
      fetch(`https://api.github.com/repos/${repo}`)
        .then(response => response.json())
        .then(data => {
          if (data.stargazers_count !== undefined) {
            this.setState(prevState => ({
              repoStats: {
                ...prevState.repoStats,
                [repo]: {
                  stars: data.stargazers_count
                }
              }
            }));
          }
        })
        .catch(error => console.error("Error fetching GitHub stats:", error));
    });
  }

  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }

  getRepoStars(repoUrl) {
    // Only show stars for the AI Web Researcher project
    if (!repoUrl || repoUrl === "#") return null;
    
    // Check if this is the AI Web Researcher project
    if (!repoUrl.includes("Automated-AI-Web-Researcher-Ollama")) {
      return null;
    }
    
    // Extract repo path from URL
    const repoPath = repoUrl.replace("https://github.com/", "");
    const stats = this.state.repoStats[repoPath];
    
    if (stats && stats.stars !== undefined) {
      return (
        <div className="repo-stars">
          <StarIcon className="star-icon" />
          <span>{stats.stars}</span>
        </div>
      );
    }
    
    return null;
  }

  render() {
    const projects = {
      "AI Web Researcher": {
        desc:
          "A Windows-optimized research assistant that leverages locally-run LLMs through Ollama to conduct thorough, automated online research. It breaks down queries into focused areas, performs systematic web searching and scraping, compiles findings into documented research, and provides comprehensive summaries with source attribution.",
        contribution: 
          "Created a Windows-compatible version of the Linux assistant, improving performance and optimizing it for Windows systems. Architected and engineered the complete system from concept to deployment, focusing on optimizing LLM prompts and creating the research orchestration pipeline.",
        techStack: "Python, Ollama, LangChain, BeautifulSoup, Windows Optimization",
        link: "https://github.com/hafeezhmha/Automated-AI-Web-Researcher-Ollama",
        open: "#",
        image: process.env.PUBLIC_URL + "/assets/automated-researcher.png"
      },
      "Aura": {
        desc:
          "A multilingual real-time transliteration system supporting major Indic languages including Hindi, Kannada, Bengali, and more. Features real-time processing, user-friendly interface, and customization options for themes and configurations.",
        contribution:
          "Developed the core NLP pipeline and designed the real-time processing algorithm that enables seamless transliteration across multiple languages.",
        techStack: "Python, NLP, Machine Learning, Streamlit",
        link: "https://github.com/hafeezhmha/Aura",
        open: "https://aura-transliterate.streamlit.app/",
        image: process.env.PUBLIC_URL + "/assets/aura-demo.png"
      },
      "Gradient Descent Visualization": {
        desc:
          "An interactive visualization tool for understanding gradient descent algorithm. Features multiple function selections (Quadratic, Cubic, Sinusoidal, Exponential), real-time updates of values, and dynamic controls for learning rate and iterations.",
        contribution:
          "Built this educational tool to make complex optimization algorithms more intuitive, implementing the mathematical foundations and creating the interactive visualization interface.",
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
                <p className="contribution"><strong>My Contribution:</strong> {projects[key].contribution}</p>
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
                    <div className="card-links">
                      {this.getRepoStars(projects[key]["link"])}
                      <ExternalLinks
                        githubLink={projects[key]["link"]}
                        openLink={projects[key]["open"]}
                      ></ExternalLinks>
                    </div>
                  </div>

                  <div className="card-title">{key}</div>
                  <div className="card-desc">{projects[key]["desc"]}</div>
                  <div className="card-contribution"><strong>My Contribution:</strong> {projects[key]["contribution"]}</div>
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