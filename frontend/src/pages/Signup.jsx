import { useState } from 'react';
import img from "./../assets/bgAuth.webp"
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
        if (password.length <= 8) {
            toast.error("Password must be greater than 8 characters.");
            return;
        }
        if (!isValidEmail(email)) {
            toast.error("Invalid email format.");
            return;
        }
        const formData = { email: email, name: name, password: password };

        try {
            const response = await axios.post("http://localhost:3000/user/signup", formData, { withCredentials: true });
            if (response.data.success) {
                toast.success("Signup successful! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 5000);
            } else {
                // Handle signup error (e.g., show error message)
                toast.error(`Signup failed: ${response.data.message}`);
            }
        } catch (error) {
            toast.error("Error during signup: " + error.message);
        }

    };

    return (
        <div className="flex min-h-screen items-center overflow-hidden relative bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${img})` }}>
            <ToastContainer />
            <div className="flex justify-center w-[96%] h-[90vh] rounded-[2rem] mx-auto rounded-20xl">
                <div className="relative w-1/2 bg-gray-200 flex items-center justify-center overflow-hidden rounded-l-3xl">
                    <div className="absolute inset-0 bg-gray-200 clip-curve"></div>
                    <img
                        src="https://podcastle.ai/images/turn-your-audio-to-text.png"
                        alt="Sample"
                        className="max-w-full h-auto relative z-10"
                    />
                </div>

                <div className="w-1/2 flex flex-col items-center justify-center bg-white p-8 overflow-auto rounded-r-3xl">
                    <div className="w-3/4">
                        <h2 className="text-2xl flex font-bold items-center justify-center mb-6 text-black">Sign Up</h2>
                        <label className="text-lg font-bold mb-1 text-black">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 mb-4 w-full transition duration-300 ease-in-out hover:shadow-lg"
                        />
                        <label className="text-lg font-bold mb-1 text-black">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 mb-4 w-full transition duration-300 ease-in-out hover:shadow-lg"
                        />
                        <label className="text-lg font-bold mb-1 text-black">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 mb-4 w-full transition duration-300 ease-in-out hover:shadow-lg"
                        />

                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4 transition duration-300 ease-in-out hover:shadow-lg">
                            Sign Up
                        </button>
                        <div className="flex justify-between w-full space-x-4">
                            <button className="w-1/2 h-12 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300 ease-in-out hover:shadow-lg">
                                Google
                                <img src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png" alt="Google" className="h-6 inline ml-2" />
                            </button>
                            <button className="w-1/2 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300 ease-in-out hover:shadow-lg">
                                Facebook
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="h-6 inline ml-2" />
                            </button>
                        </div>
                        <div className="flex justify-center mt-4">
                            <p className="text-gray-600">Already have an account? </p>
                            <button
                                className="ml-2 text-blue-600 hover:underline"
                                onClick={() => window.location.href = '/login'}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;