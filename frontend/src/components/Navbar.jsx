import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/userContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUserName = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                try {
                    const response = await fetch("http://localhost:3000/user/checkAuth", {
                        method: "GET",
                        credentials: "include",
                    });
                    const data = await response.json();
                    if (data.success) {
                        setUserName(data.userName);
                    }
                } catch (error) {
                    console.error("Error fetching user name: ", error);
                }
            }
        };

        if (isLoggedIn) {
            fetchUserName();
        }
    }, [isLoggedIn, setUserName]);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleLogout = async () => {
        localStorage.removeItem("accessToken");
        const response = await axios.get("http://localhost:3000/user/logout", {
            withCredentials: true,
        });
        if (response.data.success) {
            navigate("/login");
        } else {

            if (response.data.message) {
                toast.error(response.data.message);
            } else {
                toast.error("An error occurred during logout.");
            }
        }
    }

    return (
        <nav className="w-full bg-gray-800 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-4xl font-bold">TranscribeGuj</h1>
                <div>
                    {isLoggedIn ? (
                        <div className="flex items-center">
                            <span className="text-white mr-4 text-2xl font-bold">Welcome, {userName}!</span> {/* Show user's name if logged in */}
                            <button className="text-white bg-red-600 hover:bg-red-700 font-bold py-3 px-6 text-lg rounded" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <button className="text-white bg-blue-600 hover:bg-blue-700 font-bold py-3 px-6 text-lg rounded mr-2" onClick={handleLogin}>
                                Login
                            </button>
                            <button className="text-white bg-blue-600 hover:bg-blue-700 font-bold py-3 px-6 text-lg rounded" onClick={handleSignup}>
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 