import React from "react";
import "./styles/App.css";
import Navbar from "./Components/Navbar";
import Section from "./Components/Section";
import Gallery from "./Components/Gallery";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Section id="section1" title="Welcome to the Cat Gallery">
        <p>This website showcases adorable cat images from Pexels!</p>
      </Section>
      <Section id="section2" title="Cat Images">
        <Gallery />
      </Section>
      <Section id="section3" title="Contact Us">
        <p>If you'd like to learn more about cats, feel free to contact us!</p>
      </Section>
      <Footer />
    </div>
  );
}

export default App;
