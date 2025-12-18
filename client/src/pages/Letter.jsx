import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Edit this letter anytime 💖 (use new lines freely)
const LETTER_TEXT = `My love,

Happy birthday.

I don’t know how to fit everything I feel into words…
but I’ll try, because you deserve to hear it.

Thank you for being my calm, my excitement, my safe place,
and my favorite person — all at once.

I’m so proud of you. I’m so grateful for you.
And I’m so excited for every little tomorrow with you.

Always yours,
Mohit`;

function splitLines(text) {
  return String(text).replace(/\r\n/g, "\n").split("\n");
}

export default function Letter() {
  const navigate = useNavigate();
  const lines = useMemo(() => splitLines(LETTER_TEXT), []);
  const [visibleCount, setVisibleCount] = useState(0);

  const done = visibleCount >= lines.length;

  useEffect(() => {
    if (done) return;

    const id = setTimeout(() => {
      setVisibleCount((c) => Math.min(lines.length, c + 1));
    }, 380);

    return () => clearTimeout(id);
  }, [done, lines.length, visibleCount]);

  return (
    <main className="letter">
      <section className="letter__paper" aria-label="Love letter">
        <h1 className="letter__title">A Love Letter</h1>

        <div className="letter__body" aria-live="polite">
          {lines.slice(0, visibleCount).map((line, idx) => (
            <p className="letter__line" key={`${idx}-${line}`}>
              {line || "\u00A0"}
            </p>
          ))}

          {!done ? <span className="letter__cursor" aria-hidden="true" /> : null}
        </div>

        {done ? (
          <button
            type="button"
            className="letter__next"
            onClick={() => navigate("/gallery")}
          >
            Next 💕
          </button>
        ) : null}
      </section>
    </main>
  );
}


