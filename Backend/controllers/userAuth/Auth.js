const Us_auth_model = require("../../models/userAuth/Userauthmodel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const genrateToken = require("../../utils/generateToken");
const db = require("../../config/db");

const UserAuth = {
    signUp: async (req, res) => {
        console.log("enter");

        try {
            const { firstName, lastName, email, mobile, address, password } =
                req.body;
            const userId = uuidv4();
            const saltRounds = 10;

            // Step 1: Check if email already exists
            Us_auth_model.checkAuth({ email }, async (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error checking for existing user.",
                        error: err,
                    });
                }
                    console.log(result);

                if (result.length > 0) {
                    return res.status(409).json({
                        message:
                            "Email already in use, please try a different one.",
                    });
                }

                // Step 2: Proceed with registration
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                Us_auth_model.post(
                    userId,
                    firstName,
                    lastName,
                    email,
                    mobile,
                    address,
                    hashedPassword,
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                message:
                                    "User registration failed, please try again.",
                                error: err,
                            });
                        }

                        try {
                            const jwt_token = genrateToken({ email, userId });
                            const id = result.insertId;

                            Us_auth_model.savejwt(
                                { id, jwt_token },
                                (err, result) => {
                                    if (err) {
                                        console.error("Token not stored:", err);
                                        return res.status(500).json({
                                            message:
                                                "Token storage failed, please try again",
                                            error: err,
                                        });
                                    }
                                    console.log("Token stored successfully");
                                }
                            );

                            return res.status(201).json({
                                message: "User registered successfully",
                                result,
                                jwt_token,
                            });
                        } catch (tokenError) {
                            console.error(
                                "Error generating or saving token:",
                                tokenError
                            );
                            return res.status(500).json({
                                message:
                                    "Token processing failed, please try again",
                            });
                        }
                    }
                );
            });
        } catch (error) {
            console.error("Signup process error:", error);
            return res.status(500).json({
                message: "An error occurred during signup, please try again",
            });
        }
    },
    signin: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: "All fields are required." });
            }

            Us_auth_model.checkAuth({ email }, async (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error checking user authentication.",
                        error: err,
                    });
                }

                if (result.length === 0) {
                    return res
                        .status(404)
                        .json({ success: false, message: "User not found." });
                }

                const user = result[0];
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res
                        .status(401)
                        .json({ success: false, message: "Invalid password." });
                }

                const id = user.id;
                const jwt_token = genrateToken({ email: user.email, id });

                // ✅ Increment login_count
                const updateLoginCountQuery = `UPDATE users SET login_count = login_count + 1 WHERE email = ?`;
                db.query(updateLoginCountQuery, [user.email], (err) => {
                    if (err) {
                        console.error("Failed to update login count:", err);
                    } else {
                        console.log("Login count updated for:", user.email);
                    }
                });

                return res.status(200).json({
                    success: true,
                    message: "Login successful",
                    user,
                    jwt_token,
                });
            });
        } catch (error) {
            console.error("Signin process error:", error);
            return res.status(500).json({
                message: "An error occurred during signin, please try again.",
            });
        }
    },

    Check: async (req, res) => {
        const { email } = req.body;
        Us_auth_model.checkRegUser({ email }, async (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "New user", error: err });
            }
            return res
                .status(201)
                .json({ message: "User already booked a table", result });
        });
    },
};

module.exports = UserAuth;
