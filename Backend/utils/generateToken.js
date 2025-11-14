//JWT Genrater
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';

function genrateToken ({email, user_id}){
    const payload ={
        email:email,
        id: user_id
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}
module.exports = genrateToken;