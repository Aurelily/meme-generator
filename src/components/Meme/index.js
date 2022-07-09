import "./index.css";
import { useState, useEffect } from "react";

/* import memesData from "../../memesData"; */

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemeImages, setAllMemeImages] = useState([]);

  /*   useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setAllMemeImages(data.data.memes);
      });
  }, []); */

  /*   Avec une fonction en Async/await dans le useEffect */
  /*   -------------------------------------------------- */

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemeImages(data.data.memes);
    }
    getMemes();
  }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getMemeImage() {
    let randomIndex = getRandomInt(allMemeImages.length);
    let urlImage = allMemeImages[randomIndex].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: urlImage,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
    console.log(meme);
  }

  return (
    <div className="meme-form">
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        ></input>
        <button onClick={getMemeImage}>Générer un nouveau Meme ! 🏞</button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme-image" />
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
};

export default Meme;
