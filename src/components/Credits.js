import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";
import CodeIcon from "@material-ui/icons/Code";

class Credits extends React.Component {
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
    return (
      <FadeInSection>
        <div id="credits">
          <div className="ending-credits">
            <div className="neural-footer">
              <div className="neural-nodes">
                <span className="node"></span>
                <span className="node"></span>
                <span className="node"></span>
              </div>
              <div className="footer-tagline">
                <CodeIcon style={{ fontSize: 16, marginRight: 5 }} />
                <span>Crafted with neural networks in mind</span>
                <CodeIcon style={{ fontSize: 16, marginLeft: 5 }} />
              </div>
              <div className="copyright">
                <span>{new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    );
  }
}

export default Credits;
