const { json } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const user =  express.Router();
const db = require('../config/database');

user.post("/signin", async (req, res, next)=>{
    const {employee_name,employee_lastName,employee_department, employee_mail, employee_password} = req.body;

    if(employee_name&&employee_lastName&&employee_department&&employee_mail&&employee_password){
        
        let query = "INSERT INTO employees(employee_name, employee_lastName, employee_department,employee_mail,employee_password) "
        query+= `VALUES('${employee_name}','${employee_lastName}','${employee_department}','${employee_mail}','${employee_password}');`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows==1){
            return res.status(201).json({code: 201, message: "Usuario registrado correctamente"}); 
        }
    }
    return res.status(500).json({code: 500, message:"Campos incompletos"});

});
user.post("/login", async (req, res, next)=>{
    const {employee_mail, employee_password} =  req.body;
    const query = `SELECT * FROM employees WHERE employee_mail= '${employee_mail}' AND employee_password='${employee_password}';`;
    const rows = await db.query(query);

    
    if(employee_mail && employee_password){
        if(rows.length==1){
            const token = jwt.sign({
                employee_id: rows[0].employee_id,
                employee_mail: rows[0].employee_mail
            }, "debugkey");
            return res.status(200).json({code: 200, message:token});
        }else{
            return res.status(200).json({code: 401, message:"Usuario y/o contraseña incorrectos"});
    
        }
    }
    return res.status(500).json({code: 500, message:"Campos incompletos"}); 

});
user.get("/", async (req, res, next)=>{
    const query = "SELECT * FROM employees";
    const rows = await db.query(query);

    return res.status(201).json({code: 200, message: rows}); 

});

module.exports = user;
