// App.jsx
import React, { useState } from "react";
import { Toaster,toast } from "react-hot-toast";
import VideoPlayer from "./components/VideoPlayer";
import VideoUpload from "./components/VideoUpload";
import { Button, TextInput } from "flowbite-react";
import "./App.css";

function App() {
  const [videoId, setVideoId] = useState("f6e21144-c462-459b-af96-1cde95621710");
  const [fieldValue, setFieldValue] = useState("");

  const handlePlayVideo = () => {
    if (fieldValue.trim()) {
      setVideoId(fieldValue);
    } else {
      toast.error("Please enter a valid video ID.");
    }
  };
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center space-y-9 py-9">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
          Video Streaming App
        </h1>

        <div className="flex mt-14 w-full space-x-4 justify-around">
          <div className="w-1/3">
            <h2 className="text-lg font-semibold text-center  mb-4 dark:text-white">Playing Video</h2>
            <VideoPlayer
              src={`http://localhost:8080/api/v1/videos/${videoId}/master.m3u8`}
            />
          </div>
          <div className="w-1/3">
            <VideoUpload />
          </div>
        </div>

        <div className="my-4 flex space-x-4 items-center">
          <TextInput
            placeholder="Enter video ID here"
            name="video_id_field"
            onChange={(e) => setFieldValue(e.target.value)}
            className="w-2/3"
          />
          <Button onClick={handlePlayVideo} className="w-1/3">
            Play
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
