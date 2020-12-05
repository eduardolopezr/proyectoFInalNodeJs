const express = require('express');
const app = express();
/*
req= peticion del cliente
res= respuesta del servidor

*/ 
app.get("/", (req, res, next)=>{
    res.status(200);
    res.send("Bienvenidosssss");
});
app.listen(3000, ()=>{
    console.log("Server is running");
});