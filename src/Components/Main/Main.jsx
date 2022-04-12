import "./Main.css";
import React, { useState } from "react";
import { FiRepeat } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";

function Main() {
  //!Get Memes from API
  const [memesData, setMemesData] = React.useState({});
  React.useEffect(function () {
    console.log("Effect ran");
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemesData(data))
      .catch((error) => alert("There was an error fetching images from api.imgflip"));
  }, []);

  //!Use State Initialization
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "./images/leonardo-meme.jpg",
  });

  //!Changing State to handle input caption changes
  function handleCaptions(event) {
    const { name, value, type } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  //!Randomization of Meme objects & Meme Images
  function randomMemeImg() {
    return memesData.data.memes[Math.floor(Math.random() * memesData.data.memes.length)].url;
  }

  function randomizeMeme() {
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: randomMemeImg(),
      };
    });
  }

  //!Rendering
  return (
    <div className="container--main">
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
            <button className="btn btn--right">
              Upload
              <span className="btn__icon">
                <FiUpload size="17px" />
              </span>
            </button>
          </div>
        </div>

        <div className="line__divider"></div>

        <div className="meme-image-div">
          <img className="meme__image" src={meme.randomImage}></img>
          <h4 className="meme__top-caption">{meme.topText}</h4>
          <h4 className="meme__bot-caption">{meme.bottomText}</h4>
        </div>

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
