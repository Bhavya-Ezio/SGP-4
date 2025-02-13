import { useState, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
    isLoggedIn: null,
    setIsLoggedIn: () => { },
});

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userName, setUserName] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                if (!accessToken) return;
                const response = await axios.get("http://localhost:3000/user/checkAuth", {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setUserName(response.data.userName);
                    setIsLoggedIn(true);
                }
                // console.log("res data:", userName);
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchUser();
    }, [isLoggedIn, userName]);

    const value = { isLoggedIn, setIsLoggedIn, handleLogout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthContext, AuthContextProvider };