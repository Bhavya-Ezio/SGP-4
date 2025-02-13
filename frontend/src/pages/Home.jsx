import 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/audioUpload');
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white transition-all duration-500">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-4">Welcome to TranscribeGuj</h1>
        <p className="text-lg mb-8 text-center max-w-2xl">
          TranscribeGuj is your go-to platform for seamless transcription of Gujarati language audio into text.
          Experience the ease of converting spoken words into written form with high accuracy and speed.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
