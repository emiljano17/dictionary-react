import { TextField, ThemeProvider, MenuItem } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

import languages from "../data/languages";

import "./Header.css";

const Header = ({ language, setLanguage, word, setWord, lightMode }) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode ? "#000" : "#fff",
      },
      type: lightMode ? "light" : "dark",
    },
  });

  const changeHandler = (language) => {
    setLanguage(language);
    setWord("");
  };

  return (
    <div className="header">
      <span className="title">{word ? word : "Word Dictionary"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            id="standart-basic"
            label="Search a word"
            value={word}
            onChange={(event) => setWord(event.target.value)}
          />
          <TextField
            select
            className="select"
            label="Language"
            value={language}
            onChange={(event) => changeHandler(event.target.value)}
            helperText="Please select your language"
          >
            {languages.map((cat) => (
              <MenuItem key={cat.label} value={cat.label}>
                {cat.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
