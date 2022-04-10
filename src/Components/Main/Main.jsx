import "./Main.css";
import React, { useState } from "react";
import { FiRepeat } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import memesData from "../../Data/memesData";

function Main() {
  const [memeURL, setMemeURL] = useState("./images/leonardo-meme.jpg");

  function randomizeMeme() {
    setMemeURL(memesData.data.memes[Math.floor(Math.random() * memesData.data.memes.length)].url);
  }

  return (
    <div className="container--main">
      <div className="generator-wrapper">
        <div className="input">
          <div className="input-header">
            <h2>Insert Caption</h2>
          </div>
          <input type="text" placeholder="Top Caption"></input>
          <input type="text" placeholder="Bottom Caption"></input>
        </div>

        <div>
          <div className="input-header">
            <h2>Choose Image</h2>
          </div>
          <div className="btns-wrapper">
            <button className="btn" onClick={randomizeMeme}>
              Randomize
              <span className="btn__icon">
                <FiRepeat size="16px" />
              </span>
            </button>
            <button className="btn btn--right">
              Upload
              <span className="btn__icon">
                <FiUpload size="17px" />
              </span>
            </button>
          </div>
        </div>

        <div className="line__divider"></div>

        <img className="meme__image" src={memeURL}></img>

        <button className="btn btn--dark btn--small">
          Download
          <span className="btn__icon">
            <FiDownload size="16px" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Main;
