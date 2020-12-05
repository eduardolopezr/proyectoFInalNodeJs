const express = require('express');
const humanResources = express.Router();
const db = require('../config/database');


humanResources.post("/", async(req, res, next)=>{
    const {employee_name, employee_lastName, employee_mail, employee_password} = req.body;

    if(employee_name && employee_lastName && employee_mail && employee_password){
        let query = "INSERT INTO employees(employee_name, employee_lastName, employee_mail, employee_password)";
        query+= `VALUES('${employee_name}',${employee_lastName},${employee_mail},${ employee_password})`; 
        const rows = await db.query(query);

        console.log(rows);

        if(rows.affectedRows==1){
            return res.status(201).json({code:201, message: "Empleado insertado correctamente correctamente"});
        }
        return res.status(500).json({code: 500, message:"Ocurrió un error"});

    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})
});


module.exports = humanResources;