// api/api.js
import axios from "axios";
import Cookies from "js-cookie";


const axiosAdmin = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // From .env file
});

// Attach token to requests
api.interceptors.request.use((config) => {
    const token = Cookies.get("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosAdmin;
