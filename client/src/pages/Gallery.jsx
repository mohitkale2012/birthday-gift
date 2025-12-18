import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Edit these anytime 💖
// Tip: you can use local images too (put files in `client/public/` and use src like "/photos/1.jpg")
const PHOTOS = [
  { src: "https://picsum.photos/id/1025/900/1200", caption: "My favorite smile." },
  { src: "https://picsum.photos/id/1011/1200/900", caption: "A moment I want forever." },
  { src: "https://picsum.photos/id/1005/1200/900", caption: "Us, just being us." },
  { src: "https://picsum.photos/id/1035/1200/900", caption: "Soft days, sweet hearts." },
  { src: "https://picsum.photos/id/1040/1200/900", caption: "Every little memory matters." },
  { src: "https://picsum.photos/id/1062/1200/900", caption: "Love looks good on you." },
];

export default function Gallery() {
  const navigate = useNavigate();
  const photos = useMemo(() => PHOTOS, []);
  const [activeIndex, setActiveIndex] = useState(null);

  const activePhoto = activeIndex == null ? null : photos[activeIndex];

  function openAt(index) {
    setActiveIndex(index);
  }

  function close() {
    setActiveIndex(null);
  }

  useEffect(() => {
    if (!activePhoto) return;

    function onKeyDown(e) {
      if (e.key === "Escape") close();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePhoto]);

  return (
    <main className="page">
      <header className="page__header">
        <p className="page__eyebrow">A few favorite moments</p>
        <h1 className="page__title">Photo Gallery</h1>
        <p className="page__subtitle">
          Tap a photo to see it bigger (and the little caption that goes with it).
        </p>
      </header>

      <section className="gallery" aria-label="Photo gallery">
        {photos.map((p, idx) => (
          <button
            key={`${p.src}-${idx}`}
            type="button"
            className="gallery__tile"
            onClick={() => openAt(idx)}
            aria-label={`Open photo ${idx + 1}`}
          >
            <img className="gallery__img" src={p.src} alt={p.caption || "Photo"} loading="lazy" />
          </button>
        ))}
      </section>

      <div className="gallery__footer">
        <button
          type="button"
          className="gallery__next"
          onClick={() => navigate("/surprise")}
        >
          One last thing 💝
        </button>
      </div>

      {activePhoto ? (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="modal__card">
            <button type="button" className="modal__close" onClick={close} aria-label="Close">
              ×
            </button>

            <img className="modal__img" src={activePhoto.src} alt={activePhoto.caption || "Photo"} />

            {activePhoto.caption ? (
              <p className="modal__caption">{activePhoto.caption}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </main>
  );
}
