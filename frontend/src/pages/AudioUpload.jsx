import 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { ReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AudioUpload = () => {
  const [isFileUploadVisible, setFileUploadVisible] = useState(false);
  const [isShowRecording, setShowRecording] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const handleUploadFile = () => {
    setFileUploadVisible(true);
    setShowRecording(false);
  };

  const handleShowSpeak = () => {
    setShowRecording(true);
    setFileUploadVisible(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // console.log("File selected:", selectedFile);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/audio/upload', formData, {
        headers: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        withCredentials: true
      });
      // console.log(response.data.fileName)
      if (response.data.success) {
        toast.success("File uploaded successfully");
        navigate(`../transcript/${response.data.fileName}`);
      } else {
        toast.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleAudioStop = (blobUrl) => {
    fetch(blobUrl)
      .then(response => response.blob())
      .then(blob => {
        setFile(blob);
        console.log("Audio recorded:", blob);
        setRecording(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-6xl font-bold mb-6">Audio Upload</h1>
        <p className="text-2xl mb-8 text-center max-w-xl">
          Choose an option to start transcribing your audio. You can either upload an audio file or speak directly.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-2xl py-4 px-8 rounded transition duration-300 transform hover:scale-105 shadow-lg" onClick={handleUploadFile}>
            Upload Audio File
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold text-2xl py-4 px-8 rounded transition duration-300 transform hover:scale-105 shadow-lg" onClick={handleShowSpeak}>
            Speak Now
          </button>
        </div>
        {isFileUploadVisible && (
          <div className="mt-4 flex flex-col items-center">
            {!file && <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg p-4 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:bg-gray-700 text-center text-lg"
            />}
            <div className="mt-4" />
            {!file && <p className="text-xl">Please upload a file.</p>}
          </div>
        )}
        {isShowRecording && <div className="mt-8 flex flex-col items-center">
          <p className="text-4xl font-semibold">{isRecording ? "Recording..." : "Click start recording to record"}</p>
          <ReactMediaRecorder
            audio
            onStop={handleAudioStop}
            render={({ startRecording, stopRecording }) => (
              <button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 text-2xl rounded mt-2 transition duration-300 transform hover:scale-105 shadow-lg" onClick={() => {
                if (isRecording) {
                  stopRecording();
                } else {
                  startRecording();
                }
                setRecording(!isRecording);
              }}>
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button>
            )}
          />
        </div>}
        {file && (
          <div className="mt-2 flex flex-col items-center">
            <p className="text-2xl">Uploaded File: {file.name || 'Recorded Audio'}</p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 transition duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => {
                setFile(null);
                console.log("File removed");
              }}
            >
              Remove File
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 transition duration-300 transform hover:scale-105 shadow-lg"
              onClick={handleSubmit}
            >
              Submit File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUpload;
