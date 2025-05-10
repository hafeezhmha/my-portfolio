import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

const sketch = (p5) => {
  let particles = [];
  const particleCount = 80;
  let mouseInteractionRadius = 150;
  
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };

  p5.draw = () => {
    p5.clear();
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].display();
      particles[i].connectParticles(particles);
      particles[i].respondToMouse();
    }
    
    // Optional: Draw a subtle glow around the mouse
    const mouseGlowAlpha = p5.map(p5.sin(p5.frameCount * 0.05), -1, 1, 20, 60);
    p5.noStroke();
    p5.fill(197, 163, 255, mouseGlowAlpha);
    p5.ellipse(p5.mouseX, p5.mouseY, 15, 15);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  class Particle {
    constructor() {
      this.position = p5.createVector(p5.random(p5.width), p5.random(p5.height));
      this.velocity = p5.createVector(p5.random(-0.5, 0.5), p5.random(-0.5, 0.5));
      this.acceleration = p5.createVector(0, 0);
      this.size = p5.random(3, 5);
      this.maxSpeed = 2;
      this.color = [197, 163, 255, p5.random(50, 120)]; // Purple color matching the theme
      this.originalColor = [...this.color];
      this.highlighted = false;
    }

    update() {
      // Apply acceleration and limit speed
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      
      // Reset highlight status each frame
      this.highlighted = false;
      
      // Bounce off edges
      if (this.position.x < 0 || this.position.x > p5.width) {
        this.velocity.x *= -1;
      }
      if (this.position.y < 0 || this.position.y > p5.height) {
        this.velocity.y *= -1;
      }

      // Keep particles within bounds
      this.position.x = p5.constrain(this.position.x, 0, p5.width);
      this.position.y = p5.constrain(this.position.y, 0, p5.height);
    }

    // Apply a force to the particle
    applyForce(force) {
      this.acceleration.add(force);
    }

    // Respond to mouse movement
    respondToMouse() {
      if (p5.mouseX > 0 && p5.mouseY > 0) {
        const mousePos = p5.createVector(p5.mouseX, p5.mouseY);
        const distance = p5.dist(this.position.x, this.position.y, mousePos.x, mousePos.y);
        
        if (distance < mouseInteractionRadius) {
          // Calculate direction away from mouse
          const repelForce = p5.createVector(this.position.x - mousePos.x, this.position.y - mousePos.y);
          repelForce.normalize();
          
          // Strength inversely proportional to distance
          const strength = p5.map(distance, 0, mouseInteractionRadius, 0.5, 0);
          repelForce.mult(strength);
          
          this.applyForce(repelForce);
          
          // Highlight particles near mouse
          this.highlighted = true;
          this.color[3] = p5.map(distance, 0, mouseInteractionRadius, 255, this.originalColor[3]);
        } else {
          // Slowly return to original color
          this.color[3] = p5.lerp(this.color[3], this.originalColor[3], 0.1);
        }
      }
    }

    display() {
      p5.noStroke();
      
      // Draw a glow effect for highlighted particles
      if (this.highlighted) {
        p5.fill(this.color[0], this.color[1], this.color[2], this.color[3] * 0.3);
        p5.ellipse(this.position.x, this.position.y, this.size * 2);
      }
      
      p5.fill(this.color);
      p5.ellipse(this.position.x, this.position.y, this.size);
    }

    connectParticles(particles) {
      particles.forEach(particle => {
        if (particle !== this) {
          const distance = p5.dist(
            this.position.x, 
            this.position.y, 
            particle.position.x, 
            particle.position.y
          );
          
          if (distance < 150) {
            const alpha = p5.map(distance, 0, 150, 100, 0);
            p5.stroke(197, 163, 255, alpha);
            p5.line(
              this.position.x, 
              this.position.y, 
              particle.position.x, 
              particle.position.y
            );
          }
        }
      });
    }
  }
};

function LandingParticles() {
  return (
    <div className="particles-container">
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
}

export default LandingParticles;