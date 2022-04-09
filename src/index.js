import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import Navbar from "./Components/Navbar/Navbar";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";

ReactDOM.render(
  <React.StrictMode>
    <div className="page">
      <Navbar />
      <Main />
      <Footer />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
