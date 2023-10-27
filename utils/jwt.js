const jwt = require('jsonwebtoken');

const createJwt = ( {payload}) =>{
    const token = jwt.sign(payload,"1123");
    return token;
}

const isTokenValid = ({ token }) => jwt.verify(token, "1123");

module.exports ={
    createJwt,
    isTokenValid
}