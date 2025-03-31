import 'react';
import Navbar from '../components/Navbar';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/userContext';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TranscriptPage = () => {
    const [transcript, setTranscript] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const fileName = window.location.pathname.split("/").pop();
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchTranscript = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/audio/transcript/${fileName}`);
                setTranscript(response.data.transcript);
            } catch (error) {
                console.error('Error fetching transcript:', error);
            }
        };

        fetchTranscript();
    }, [fileName]);

    const downloadTranscript = () => {
        const blob = new Blob([transcript], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const saveToLibrary = () => {
        if (isLoggedIn) {
            toast.success("Logged in");
        } else {
            setShowPopup(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleLogin= () => {
        navigate("../login")
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl mx-auto p-6">
                <h1 className="text-6xl font-bold mb-6">Transcript</h1>
                <p className="text-2xl mb-8 text-center">
                    Here is the transcript of your audio file: {fileName}
                </p>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 w-full shadow-xl border border-white border-opacity-20">
                    <h2 className="text-black text-3xl font-semibold mb-4">Your transcript is:</h2>
                    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-white text-lg leading-relaxed">
                        <p>{transcript}</p>
                    </div>
                    <div className="mt-8 flex justify-center space-x-4">
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-3 px-6 rounded transition duration-300 transform hover:scale-105 shadow-lg"
                            onClick={saveToLibrary}
                        >
                            Save to Library
                        </button>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 px-6 rounded transition duration-300 transform hover:scale-105 shadow-lg"
                            onClick={downloadTranscript}
                        >
                            Download Transcript
                        </button>
                        <button
                            className="bg-yellow-600 hover:bg-yellow-700 text-white text-xl font-bold py-3 px-6 rounded transition duration-300 transform hover:scale-105 shadow-lg"
                            onClick={() => {/* Function to download with timestamp */ }}
                        >
                            Download with Timestamp
                        </button>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-3 px-6 rounded transition duration-300 transform hover:scale-105 shadow-lg"
                            onClick={() => {/* Function to download SRT */ }}
                        >
                            Download SRT
                        </button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md  bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl text-black font-bold mb-4">Login Required</h2>
                        <p className="text-xl text-black mb-4">You need to log in to save to the library.</p>
                        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded" onClick={handleClosePopup}>
                            Close
                        </button>
                        <button className="mt-4 ml-4 bg-blue-600 text-white py-2 px-4 rounded" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default TranscriptPage;
