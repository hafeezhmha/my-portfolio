import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Now from "./components/Now";
import Credits from "./components/Credits";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import BackToTop from "./components/BackToTop";
import "./App.css";
import "./styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/welcome">
            <Landing />
          </Route>
          <Route path="/">
            <NavBar></NavBar>
            <div id="content">
              <Intro></Intro>
              <About></About>
              <Experience></Experience>
              <Projects></Projects>
              <Blog></Blog>
              <Now></Now>
              <Credits></Credits>
              <BackToTop />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
