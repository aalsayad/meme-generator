import "./Navbar.css";
import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container--navbar">
        <div className="navbar-brand">
          {/* <img className="logo" src="./images/meme-logo.png" /> */}
          <div>
            <h1>Meme Generator</h1>
            <p>Scrimba React Course Part 3</p>
          </div>
        </div>
        <div className="navbar-link-wrapper">
          <a href="" target="_blank">
            Other React Apps
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
