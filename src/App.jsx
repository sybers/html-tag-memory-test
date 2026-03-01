import { useRef } from "react";
import { isValidHTMLelement, HTMLElements } from "./html-elements";

import "./App.css";

import useLocalStorage from "./hooks/useLocalStorage";

import AppHeader from "./components/AppHeader";
import ProgressBar from "./components/ProgressBar";
import TagInput from "./components/TagInput";
import TagList from "./components/TagList";

function animateWiggle(element) {
  element.animate(
    [
      { transform: "translateX(0px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(0px)" },
    ],
    {
      duration: 125,
      iterations: 2,
    },
  );
}

function App() {
  const inputRef = useRef(null);
  const [guessedTags, setGuessedTags] = useLocalStorage("html-guess-game", []);

  const remainingTagsToGuessCount = HTMLElements.length - guessedTags.length;

  const handleSubmit = (event) => {
    event.preventDefault();

    const tag = inputRef.current.value.toLowerCase();
    if (!isValidHTMLelement(tag) || guessedTags.includes(tag)) {
      animateWiggle(inputRef.current);
      inputRef.current.value = "";
      return;
    }

    setGuessedTags([tag, ...guessedTags]);

    inputRef.current.value = "";
  };

  const resetGuesses = (event) => {
    event.preventDefault();

    const hasConfirmed = confirm("Are you sure you want to restart?");
    if (hasConfirmed) {
      setGuessedTags([]);
    }
  };

  const shareText = [
    `I could remember ${guessedTags.length} HTML tags!`,
    "Do you think you can beat me?",
    "Try the HTML tag memory game 👇",
    typeof window !== "undefined" ? window.location.origin : "",
  ]
    .join("\n")
    .slice(0, 300);

  const blueskyShareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(
    shareText,
  )}`;

  return (
    <div>
      <AppHeader />
      <form className="app-form" onSubmit={handleSubmit}>
        <ProgressBar current={guessedTags.length} total={HTMLElements.length} />
        <TagInput ref={inputRef} autoFocus />
      </form>
      <div className="share-score-cta">
        {remainingTagsToGuessCount === 0 ? (
          <p className="share-score-cta__counter">
            🎉 Congrats, you guessed all existing HTML tags! 🎉
            <br />
            {"You're a true master of HTML!"}
            <br />
            <a className="restart-guesses" onClick={resetGuesses}>
              restart
            </a>
          </p>
        ) : (
          <p className="share-score-cta__counter">
            <b>{guessedTags.length}</b> guessed,{" "}
            <b>{remainingTagsToGuessCount}</b> to go.{" "}
            <a className="restart-guesses" onClick={resetGuesses}>
              restart
            </a>
          </p>
        )}
        <p className="share-score-cta__phrase">
          {remainingTagsToGuessCount === 0 ? (
            <>
              <a
                href={blueskyShareUrl}
                target="_blank"
                rel="noreferrer"
                className="share-score-link"
              >
                Share on Bluesky
              </a>{" "}
              to challenge your friends!
            </>
          ) : (
            <>
              {guessedTags.length >= 50 && "Stuck? "}
              <a
                href={blueskyShareUrl}
                target="_blank"
                rel="noreferrer"
                className="share-score-link"
              >
                Share on Bluesky
              </a>{" "}
              to challenge your friends!
            </>
          )}
        </p>
      </div>
      <div style={{ marginTop: "32px" }}>
        {guessedTags.length === 0 && <p>Start by typing an HTML tag name...</p>}
        {guessedTags.length >= 0 && <TagList tags={guessedTags} />}
      </div>
    </div>
  );
}

export default App;
