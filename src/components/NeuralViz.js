import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import "../styles/NeuralViz.css";

const Sketch = p5 => {
  let nodes = [];
  let connections = [];
  const layers = [4, 6, 6, 4]; // Neural network architecture
  const nodeRadius = 6;
  const pulseSpeed = 0.02;
  let pulsePhase = 0;

  class Node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.activation = 0;
    }

    draw() {
      p5.noStroke();
      p5.fill(230, 230, 250, this.activation * 255); // Lavender color
      p5.circle(this.x, this.y, nodeRadius * 2);
      p5.fill(230, 230, 250, 100); // Outer glow
      p5.circle(this.x, this.y, nodeRadius * 2.5);
    }
  }

  class Connection {
    constructor(start, end) {
      this.start = start;
      this.end = end;
      this.activation = 0;
    }

    draw() {
      p5.stroke(230, 230, 250, this.activation * 100);
      p5.strokeWeight(1);
      p5.line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    createNetwork();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    createNetwork();
  };

  const createNetwork = () => {
    nodes = [];
    connections = [];
    
    // Create nodes for each layer
    const spacing = p5.width / (layers.length + 1);
    
    for (let i = 0; i < layers.length; i++) {
      const layerNodes = [];
      const layerSpacing = p5.height / (layers[i] + 1);
      
      for (let j = 0; j < layers[i]; j++) {
        const x = spacing * (i + 1);
        const y = layerSpacing * (j + 1);
        layerNodes.push(new Node(x, y));
      }
      nodes.push(layerNodes);
    }

    // Create connections between layers
    for (let i = 0; i < nodes.length - 1; i++) {
      for (let node1 of nodes[i]) {
        for (let node2 of nodes[i + 1]) {
          connections.push(new Connection(node1, node2));
        }
      }
    }
  };

  p5.draw = () => {
    p5.clear();
    pulsePhase += pulseSpeed;

    // Update and draw connections
    for (let i = 0; i < connections.length; i++) {
      const phase = (pulsePhase + i * 0.02) % (2 * p5.PI);
      connections[i].activation = (p5.sin(phase) + 1) / 2;
      connections[i].draw();
    }

    // Update and draw nodes
    for (let layer of nodes) {
      for (let node of layer) {
        node.activation = (p5.sin(pulsePhase) + 1) / 2;
        node.draw();
      }
    }
  };
};

const NeuralViz = () => (
  <div id="neural-viz">
    <ReactP5Wrapper sketch={Sketch} />
  </div>
);

export default NeuralViz; 