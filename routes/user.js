const express = require('express');
const user = express.Router();

user.get("",(req, res, next)=>{
    res.status(200).json({code: 201, message:"Estás en la página para modificar datos de usuario"});
});

module.exports = user;