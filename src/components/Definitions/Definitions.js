import "./Definitions.css";

const Definitions = ({ word, language, meanings }) => {
  return (
    <div className="meanings">
      {meanings[0] && word && language === "en" && (
        <audio
          src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
          className="audio"
          controls
        >
          Your browser doesn't support audio element.
        </audio>
      )}

      {word === "" ? (
        <span className="subtitle">Start by typing a word...</span>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div className="singleMean">
                <b>{def.definition}</b>
                <hr />
                {def.example && (
                  <span>
                    <b>Example:</b>
                    {def.example}
                  </span>
                )}
                {def.synonyms && (
                  <span>
                    <b>Synonyms:</b>
                    {def.synonyms.map((s) => `${s}, `)}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default Definitions;
