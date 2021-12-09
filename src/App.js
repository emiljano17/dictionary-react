import { useEffect, useState } from "react";

import Header from "./components/Header";
import Definitions from "./components/Definitions/Definitions";

import { Container, Switch } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import axios from "axios";

import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [language, setLanguage] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const NightMode = withStyles({
    switchBase: {
      color: "#e0e0e0",
      "&$checked": {
        color: "#9e9e9e",
      },
      "&$checked + $track": {
        backgroundColor: "#9e9e9e",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`
      );

      setMeanings(data.data);
    } catch (error) {
      // throw new Error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    if (word.length > 0) {
      setTimeout(() => {
        dictApi();
      }, 1000);
    }
  }, [word, language]);

  return (
    <div
      className="App"
      style={{
        backgroundColor: lightMode ? "#fff" : "#282c34",
        color: lightMode ? "black" : "white",
        transition: "all 0.3s linear",
      }}
    >
      <Container className="custom__container" maxWidth="md">
        <div className="nightmode">
          <span>{lightMode ? "Dark Mode" : "Light Mode"} </span>
          <NightMode
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header
          language={language}
          setLanguage={setLanguage}
          word={word}
          setWord={setWord}
          lightMode={lightMode}
        />
        {meanings && (
          <Definitions word={word} meanings={meanings} language={language} />
        )}
      </Container>
    </div>
  );
}

export default App;
