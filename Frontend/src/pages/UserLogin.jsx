import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/actions/authAction";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Box
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Google } from "@mui/icons-material";
import axios from "axios";
import { setCookie } from "../../utils/cookieUtils";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (Object.values(formData).some((field) => field.trim() === "")) {
      alert("Please fill in all fields.");
      return;
    }

    axios.post("/api/user/signin", formData)
      .then((res) => {
        alert(res.data.message);
        setFormData({ firstName: "", lastName: "", email: "", mobile: "", address: "", password: "" });
        setCookie("user", res.data.jwt_token, 1);
        dispatch(setToken(res.data.jwt_token));
        navigate("/");
      })
      .catch((err) => {
        if (err.response?.data?.error?.sqlMessage) {
          alert("Duplicate email. Please use a different email.");
        }
      });
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, backgroundColor: "#1e1e1e", color: "#d4af37", width: "70%", height:'90%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField fullWidth label="Email" name="email" InputLabelProps={{style:{color:'#d4af378c'}}} value={formData.email} onChange={handleChange} type="email" variant="outlined" size="small" sx={{ mt: 2, input: { color: "#ffff" }, '& .MuiOutlinedInput-root fieldset': { borderColor: "#d4af37" } }} />
        <TextField fullWidth label="Password" name="password" InputLabelProps={{style:{color:'#d4af378c'}}} value={formData.password} onChange={handleChange} type={showPassword ? "text" : "password"} variant="outlined" size="small" InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "#d4af37" }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} sx={{ mt: 2, input: { color: "#d4af37" }, '& .MuiOutlinedInput-root fieldset': { borderColor: "#d4af37" } }} />
        <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 3, backgroundColor: "#d4af37", color: "#000", fontWeight: "bold", '&:hover': { backgroundColor: "#b8962e" } }}>Sign Up</Button>
        <Button fullWidth variant="outlined" startIcon={<Google />} sx={{ mt: 2, color: "#4285F4", borderColor: "#fff00" }}>
          Sign In with Google
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2, color: "#d4af37" }}>
          Create new Account <Button onClick={() => navigate('/signup')} sx={{ color: "#d4af37", textTransform: "none" }}>Sign Up</Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignIn;
