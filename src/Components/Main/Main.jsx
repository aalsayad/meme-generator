import "./Main.css";
import React, { useState } from "react";
import { FiRepeat } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

function Main() {
  //!Get Memes from API
  const [memesData, setMemesData] = React.useState({});
  React.useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemesData(data))
      .catch((error) => alert("There was an error fetching images from api.imgflip"));
  }, []);

  //!Use State Initialization
  const [meme, setMeme] = useState({
    id: 1,
    topText: "",
    bottomText: "",
    randomImage: "./images/leonardo-meme.jpg",
  });

  //!Changing State to handle input caption changes
  function handleCaptions(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  //!Randomization of Meme objects & Meme Images
  function randomMemeNumber() {
    return Math.floor(Math.random() * memesData.data.memes.length);
  }

  function randomizeMeme() {
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        id: memesData.data.memes[randomMemeNumber()].id,
        randomImage: memesData.data.memes[randomMemeNumber()].url,
      };
    });
  }

  //!HTML2Image + downloadjs
  function screenshot() {
    htmlToImage.toJpeg(document.getElementById("meme-screenshot"), { quality: 0.95 }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = `sayad-design-${meme.id}.jpeg`;
      link.href = dataUrl;
      link.click();
    });
  }

  //!Coming Soon Alert on Click
  const [uploadButtonClicked, setUploadButtonClicked] = useState(false);
  function comingSoonAlert() {
    setUploadButtonClicked((prevValue) => !prevValue);
    setTimeout(() => {
      setUploadButtonClicked((prevValue) => !prevValue);
    }, 450);
  }

  //!Popup on Hover
  const [uploadButtonHovered, setUploadButtonHovered] = useState(false);
  function popup() {
    setUploadButtonHovered((prevValue) => !prevValue);
  }

  //!Rendering
  return (
    <div id="meme-screenshot" className="container--main">
      <div className="generator-wrapper">
        <div className="input">
          <div className="input-header">
            <h2>Insert Caption</h2>
          </div>
          <input type="text" placeholder="Top Caption" onChange={handleCaptions} name="topText" value={meme.topText} />
          <input
            type="text"
            placeholder="Bottom Caption"
            onChange={handleCaptions}
            name="bottomText"
            value={meme.bottomText}
          />
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
            <button
              onClick={comingSoonAlert}
              onMouseEnter={popup}
              onMouseLeave={popup}
              className={uploadButtonClicked ? "btn btn--right btn--relative nudge" : "btn btn--right btn--relative"}
            >
              Upload
              <span className="btn__icon">
                <FiUpload size="17px" />
              </span>
              {uploadButtonHovered && (
                <div className="pop-up">
                  <p>Feature coming soon</p>
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="line__divider"></div>

        <div className="meme-image-div">
          <img className="meme__image" src={meme.randomImage}></img>
          <h4 draggable="false" className="meme__top-caption">
            {meme.topText}
          </h4>
          <h4 className="meme__bot-caption">{meme.bottomText}</h4>
        </div>

        <button className="btn btn--dark btn--small" onClick={screenshot}>
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
