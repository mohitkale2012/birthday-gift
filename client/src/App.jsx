import "./App.css";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import BackgroundMusic from "./components/BackgroundMusic";
import Landing from "./pages/Landing";
import Letter from "./pages/Letter";
import Gallery from "./pages/Gallery";
import Surprise from "./pages/Surprise";
import Final from "./pages/Final";
import Timeline from "./pages/Timeline";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Force the app to always start at the first page on refresh/load.
  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
    // Intentionally run only once on initial mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/final" element={<Final />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
