import React from "react";

import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import FadeInSection from "./FadeInSection";
import NeuralViz from "./NeuralViz";

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
      visible: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  render() {
    return (
      <div id="intro">
        <NeuralViz></NeuralViz>
        <Typist avgTypingDelay={120}>
          <span className="intro-title">
            {"hi, "}
            <span className="intro-name">{"hafeez"}</span>
            {" here."}
          </span>
        </Typist>
        <FadeInSection>
          <div className="intro-subtitle">
            <span className="code-element">{"<"}</span>
            <span className="code-word">create</span>
            <span className="code-element">{"/>"}</span>
            <span className="code-element">{"<"}</span>
            <span className="code-word">code</span>
            <span className="code-element">{"/>"}</span>
            <span className="code-element">{"<"}</span>
            <span className="code-word">innovate</span>
            <span className="code-element">{"/>"}</span>
          </div>
          <div className="intro-desc">
            I'm a machine learning engineer focused on bringing AI systems to life. 
            I specialize in computer vision and neural networks, creating intelligent 
            solutions through innovative design.
          </div>
          <div className="intro-tagline">
            the machine - it's learning!
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default Intro;
