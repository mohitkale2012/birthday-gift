import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Client-side only (you can change this anytime)
// The decoded phrase (3 words):
const SECRET_ANSWER = "laddoo pandi forever";

// The "amalgamation" clue (anagram-style scrambled words).
// You can reshuffle these letters anytime.
const CLUE_WORDS = ["odlado", "idnap", "revrefo"];

export default function Surprise() {
  const navigate = useNavigate();
  const expected = useMemo(
    () => SECRET_ANSWER.trim().toLowerCase().replace(/\s+/g, " "),
    [],
  );
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("locked"); // locked | error | unlocked

  const unlocked = status === "unlocked";
  const error = status === "error";

  function onSubmit(e) {
    e.preventDefault();

    const input = answer.trim().toLowerCase().replace(/\s+/g, " ");
    if (!input) {
      setStatus("error");
      return;
    }

    if (input === expected) {
      setStatus("unlocked");
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="surprise">
      <section
        className={`surprise__card ${unlocked ? "surprise__card--unlocked" : ""}`}
        aria-label="Surprise unlock"
      >
        <div className="surprise__icon" aria-hidden="true">
          {unlocked ? "🔓" : "🔒"}
        </div>

        <p className="surprise__eyebrow">One last puzzle</p>
        <h1 className="surprise__title">Decode the amalgamation 💝</h1>

        {unlocked ? (
          <p className="surprise__message surprise__message--success">
            Yay! You unlocked it.
          </p>
        ) : error ? (
          <p className="surprise__message surprise__message--error" role="alert">
            Almost… try again (a little hint: it’s something sweet).
          </p>
        ) : (
          <p className="surprise__message">
            Decode these 3 mixed-up words, then type the full phrase.
          </p>
        )}

        {!unlocked ? (
          <form className="surprise__form" onSubmit={onSubmit}>
            <div className="surprise__clue" aria-label="Clue words">
              {CLUE_WORDS.map((w, idx) => (
                <span className="surprise__clueChip" key={`${w}-${idx}`}>
                  {w}
                </span>
              ))}
            </div>

            <label className="surprise__label" htmlFor="secretAnswer">
              Decoded phrase
            </label>
            <input
              id="secretAnswer"
              className="surprise__input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type 3 words here…"
              autoComplete="off"
              inputMode="text"
            />
            <button className="surprise__submit" type="submit">
              Unlock
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="surprise__open"
            onClick={() => navigate("/final")}
          >
            Open your surprise 🎉
          </button>
        )}
      </section>
    </main>
  );
}
