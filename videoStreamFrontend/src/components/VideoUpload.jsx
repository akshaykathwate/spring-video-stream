import axios from "axios";
import {
  Button,
  Card,
  Label,
  Progress,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrPowerReset } from "react-icons/gr";

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [uploading, setuploading] = useState(false);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });

  function handleFileChange(event) {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }

  function formFiledChange(event) {
    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    });
  }

  function handleForm(formEvent) {
    if (!selectedFile && !meta.title && !meta.description) {
      toast.error(
        "Please provide a file, title, and description before submitting."
      );
    } else {
      if (!selectedFile) {
        toast.error("Please select a file..!!");
      }
      if (!meta.title) {
        toast.error("Please Enter a title..!!");
      }
      if (!meta.description) {
        toast.error("Please Enter a description..!!");
      }
    }

    formEvent.preventDefault();
    saveVideotoServer(selectedFile, meta);
  }

  function resetForm() {
    setMeta({
      title: "",
      description: "",
    }),
      setuploading(false),
      setProgress(0),
      setSelectedFile(null);
  }

  async function saveVideotoServer(video, videoMetadata) {
    setuploading(true);
    const formData = new FormData();
    formData.append("title", videoMetadata.title);
    formData.append("description", videoMetadata.description);
    formData.append("file", video);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/videos",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );
      setMessage("file Uploaded successful!");
      toast.success("file Uploaded successful!");
      resetForm();
    } catch (error) {
      setMessage("Upload failed. Please try again.");
      toast.error(message);
      setuploading(false);
    }
  }

  return (
    <div className="text-slate-100 flex flex-col items-center justify-center">
      <Card className="max-w-md w-full p-5">
        <h2 className="text-2xl font-semibold text-center text-emerald-400 mb-6">
          Upload Your Video
        </h2>
        <form
          noValidate
          className="flex flex-col space-y-5 "
          onSubmit={handleForm}
        >
          <div className="mb-4">
            <Label htmlFor="video-title" value="Video Title" />
            <TextInput
              name="title"
              id="video-title"
              placeholder="Enter Title"
              value={meta.title}
              onChange={formFiledChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="video-description" value="Video Description" />
            <Textarea
              id="video-description"
              name="description"
              placeholder="Write a brief description"
              value={meta.description}
              onChange={formFiledChange}
              required
              rows={4}
              className="mt-2"
            />
          </div>

          <div className="flex items-center space-x-4">
            <img
              className="h-16 w-16 object-cover rounded-full"
              src={
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
              }
              alt="Selected video thumbnail"
            />
            <label className="block">
              <span className="sr-only">Select Video File</span>
              <input
                name="file"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
              />
            </label>
          </div>
          {uploading && (
            <Progress
              progress={progress}
              progressLabelPosition="inside"
              textLabel="Uploading..."
              textLabelPosition="outside"
              color="green"
              size="xl"
              labelProgress={true}
              labelText={true}
            />
          )}

          <div className="flex justify-evenly items-center ">
            <Button disabled={uploading} type="submit" color="blue">
              Upload
            </Button>
            <Button
              type="button"
              color="gray"
              className="flex items-center"
              onClick={resetForm}
            >
              <GrPowerReset className="" size={18} />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default VideoUpload;
