import { useRef } from "react";
import { isValidHTMLelement, HTMLElements } from "./html-elements";

import "./App.css";

import useLocalStorage from "./hooks/useLocalStorage";

import AppHeader from "./components/AppHeader";
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
    }
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

  return (
    <div>
      <AppHeader />
      <form className="app-form" onSubmit={handleSubmit}>
        <TagInput ref={inputRef} autoFocus />
      </form>
      <p>
        {remainingTagsToGuessCount === 0 ? (
          <p>
            🎉 Congrats, you guessed all existing HTML tags! 🎉
            <br />
            {"You're a true master of HTML!"}
          </p>
        ) : (
          <>
            <b>{guessedTags.length}</b> guessed,{" "}
            <b>{remainingTagsToGuessCount}</b> to go.{" "}
            <a className="restart-guesses" onClick={resetGuesses}>
              restart
            </a>
          </>
        )}
      </p>
      <div style={{ marginTop: "32px" }}>
        {guessedTags.length === 0 && <p>Start by typing an HTML tag name...</p>}
        {guessedTags.length >= 0 && <TagList tags={guessedTags} />}
      </div>
    </div>
  );
}

export default App;
