import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import "./App.css";
import VideoUpload from "./components/VideoUpload";

function App() {
  const videoId = "590d7f63-23a3-411f-9fb2-cae378b64b14";

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || false
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex flex-col items-center space-y-6 justify-center py-10 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-3 rounded-full shadow-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <MdOutlineLightMode size={28} /> : <MdDarkMode size={28} />}
      </button>

      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center">
        🎥 Video Streaming Application
      </h1>

      <div className="flex flex-wrap justify-center items-start gap-10 w-full px-5">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-emerald-400 mb-4">
            Now Playing
          </h2>
          <div className="shadow-lg rounded-lg overflow-hidden">
            <video
              src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`}
              controls
              className="w-[300px] sm:w-[500px] h-[200px] sm:h-[400px] bg-black"
            />
          </div>
        </div>

        <VideoUpload />
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
