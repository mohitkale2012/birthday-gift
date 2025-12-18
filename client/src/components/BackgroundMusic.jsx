import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic({ src = "/music/background.mp3" }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onError = () => setError("Couldn’t load the music file.");

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");

    try {
      if (audio.paused) {
        await audio.play(); // user gesture required (we only call from a click)
      } else {
        audio.pause();
      }
    } catch (e) {
      setError("Tap again to allow audio.");
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="metadata" />

      <button
        type="button"
        className="bg-music"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        aria-pressed={isPlaying}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        <span className="bg-music__icon" aria-hidden="true">
          {isPlaying ? "⏸" : "▶"}
        </span>
        <span className="bg-music__text">{isPlaying ? "Pause" : "Play"} music 🎵</span>
      </button>

      {error ? (
        <div className="bg-music__error" role="status" aria-live="polite">
          {error}
        </div>
      ) : null}
    </>
  );
}


