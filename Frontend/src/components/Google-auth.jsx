import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleAuth = () => {
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log("Google Token:", credentialResponse);
    try {
      const res = await axios.post("http://localhost:5000/auth/google", {
        token: credentialResponse.credential,
      });
      console.log("User Data:", res.data);
      alert("Login Successful!");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <h2>Sign Up</h2>
        <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => console.log("Login Failed")} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
