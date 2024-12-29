import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import "./App.css";
import VideoUpload from "./components/VideoUpload";

function App() {
  let videoId = "590d7f63-23a3-411f-9fb2-cae378b64b14";

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || false
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col items-center space-y-5 justify-center py-10 relative bg-gray-100 dark:bg-gray-900 min-h-screen">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-full shadow-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <MdOutlineLightMode size={24} /> : <MdDarkMode size={24} />}
      </button>

      <h1 className="text-2xl  font-bold text-gray-900 dark:text-gray-100">
        Video Streaming Application
      </h1>
      <div className="flex justify-evenly w-screen">
        <div className=" flex flex-col ">
          <h2 className="text-gray-900 text-2xl font-semibold text-center dark:text-emerald-400 mt-5
            "> Playing Videos
          </h2>
          <video
            src={`http://localhost:8080/api/v1/videos/stream/${videoId}`}
            controls
            style={{ width: 500, height: 400 }}
          ></video>
        </div>
        <VideoUpload />
      </div>

      <Toaster />
    </div>
  );
}

export default App;
