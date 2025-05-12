import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import StarIcon from "@material-ui/icons/Star";
import GitHubIcon from '@material-ui/icons/GitHub';
import LaunchIcon from '@material-ui/icons/Launch';
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";
import { Carousel } from "react-bootstrap";

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
      repoStats: {},
      activeProject: 0,
      isTransitioning: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCarouselSelect = this.handleCarouselSelect.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.projectRefs = {};
  }

  componentDidMount() {
    this.fetchGitHubStats();
    
    // Preload all project images to avoid content flash
    const projectsArray = Object.keys(this.getProjects());
    projectsArray.forEach(key => {
      const img = new Image();
      img.src = this.getProjects()[key].image;
    });
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

  handleCarouselSelect(selectedIndex, e) {
    // Update state for the active project
    this.setState({
      activeProject: selectedIndex,
      isTransitioning: true
    }, () => {
      // Mark transition as complete after a brief delay
      setTimeout(() => {
        this.setState({ isTransitioning: false });
      }, 500);
      
      // We'll disable auto-scrolling entirely when using the carousel controls
      // This avoids the issues with null references
      
      // The Bootstrap Carousel onSelect passes the selectedIndex
      // but does not always pass an event object
      
      // For safety, we'll completely avoid auto-scrolling
      // Users can manually scroll to see the highlighted card if needed
    });
  }
  
  // Add a separate method for card clicks to avoid confusion with carousel controls
  handleCardClick(index) {
    // Set the active project in the carousel
    this.setState({
      activeProject: index,
      isTransitioning: true
    }, () => {
      setTimeout(() => {
        this.setState({ isTransitioning: false });
      }, 500);
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

  getProjects() {
    return {
      "AI Web Researcher": {
        desc:
          "A Windows-optimized research assistant that leverages locally-run LLMs through Ollama to conduct thorough, automated web research.",
        contribution: 
          "Created a Windows-compatible version, improving performance and optimizing the research orchestration pipeline.",
        techStack: "Python, Ollama, LangChain, BeautifulSoup, Windows Optimization",
        link: "https://github.com/hafeezhmha/Automated-AI-Web-Researcher-Ollama",
        open: "#",
        image: process.env.PUBLIC_URL + "/assets/automated-researcher.png"
      },
      "Aura": {
        desc:
          "A multilingual real-time transliteration system supporting major Indic languages including Hindi, Kannada, Bengali, and more.",
        contribution:
          "Developed the core NLP pipeline and designed the real-time processing algorithm for seamless transliteration.",
        techStack: "Python, NLP, Machine Learning, Streamlit",
        link: "https://github.com/hafeezhmha/Aura",
        open: "https://aura-transliterate.streamlit.app/",
        image: process.env.PUBLIC_URL + "/assets/aura-demo.png"
      },
      "Gradient Descent Visualization": {
        desc:
          "An interactive visualization tool for understanding gradient descent algorithm with multiple function selections and real-time control parameters.",
        contribution:
          "Built this educational tool to make complex optimization algorithms more intuitive through interactive visualization.",
        techStack: "Python, Streamlit, Mathematical Visualization, Interactive Plotting",
        link: "#",
        open: "https://gradient-descent-visual.streamlit.app/",
        image: process.env.PUBLIC_URL + "/assets/gradient-descent-demo.png"
      }
    };
  }

  render() {
    const projects = this.getProjects();
    const projectsArray = Object.keys(projects);

    return (
      <div id="projects">
        <div className="section-header ">
          <span className="section-title">/ projects</span>
        </div>

        <div className="carousel-wrapper">
          <Carousel 
            className="project-carousel" 
            indicators={true} 
            interval={null}
            onSelect={this.handleCarouselSelect}
            activeIndex={this.state.activeProject}
            fade={true}
          >
            {projectsArray.map((key, i) => (
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100"
                  src={projects[key].image}
                  alt={key}
                />
                <Carousel.Caption className={this.state.isTransitioning ? 'transitioning' : ''}>
                  <div className="caption-content">
                    <h3>{key}</h3>
                    <p>{projects[key].desc}</p>
                    <p className="contribution"><strong>My Contribution:</strong> {projects[key].contribution}</p>
                    <p className="techStack">{projects[key].techStack}</p>
                    <div className="carousel-links">
                      {projects[key].link !== "#" && (
                        <a href={projects[key].link} target="_blank" rel="noopener noreferrer" className="project-link github">
                          <GitHubIcon /> GitHub
                        </a>
                      )}
                      {projects[key].open !== "#" && (
                        <a href={projects[key].open} target="_blank" rel="noopener noreferrer" className="project-link demo">
                          <LaunchIcon /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="project-container">
          <ul className="projects-grid">
            {projectsArray.map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`} key={i}>
                <li 
                  className={`projects-card ${this.state.activeProject === i ? 'active-project' : ''}`} 
                  onClick={() => this.handleCardClick(i)}
                  ref={el => this.projectRefs[i] = el}
                >
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