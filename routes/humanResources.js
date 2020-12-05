const { json } = require('express');
const express = require('express');
const humanResources = express.Router();
const db = require('../config/database');


humanResources.post("/", async(req, res, next)=>{
    const {employee_name, employee_lastName, employee_department, employee_mail, employee_password} = req.body;

    if(employee_name && employee_lastName && employee_department && employee_mail && employee_password){

        let query = "INSERT INTO employees(employee_name, employee_lastName,employee_department, employee_mail, employee_password)";
        query+= `VALUES('${employee_name}','${employee_lastName}','${employee_department}','${employee_mail}','${ employee_password}')`; 
        const rows = await db.query(query);

        console.log(rows);

        if(rows.affectedRows==1){
            return res.status(201).json({code:201, message: "Empleado insertado correctamente correctamente"});
        }
        return res.status(500).json({code: 500, message:"Ocurrió un error"});

    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})
});
humanResources.delete("/:id([0-9]{1,3})", async (req, res, next)=>{
    const query = `DELETE FROM employees WHERE employee_id = ${req.params.id}`;
    const rows = await db.query(query);
    console.log(req.params.id);
    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});

    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

humanResources.put("/:id([0-9]{1,3})", async(req, res, next)=>{
    const {employee_name, employee_lastName, employee_department, employee_mail, employee_password} = req.body;

    if(employee_name && employee_lastName && employee_department && employee_mail && employee_password){

        let query = `UPDATE employees SET employee_name='${employee_name}' , employee_lastName='${employee_lastName}',`;
        query+=`employee_department='${employee_department}',employee_mail='${employee_mail}', employee_password='${employee_password}' WHERE employee_id=${req.params.id};`;
       
        const rows = await db.query(query);

        console.log(rows);

        if(rows.affectedRows==1){
            return res.status(200).json({code:200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message:"Ocurrió un error"});

    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})

});
humanResources.post("/search", async(req, res, next)=>{
    const {employee_name, employee_lastName} = req.body;
    console.log(employee_name+employee_lastName);
    if(employee_name && employee_lastName){

        let query = `SELECT * FROM employees WHERE employee_name='${employee_name}' AND employee_lastName= '${employee_lastName}';`;
        const rows = await db.query(query);

        console.log(rows);

        if(rows.length==1){
            return res.status(201).json({code:201, message: "Usuario encontrado"});
        }
        return res.status(500).json({code: 500, message:"Ocurrió un error"});

    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})
});
module.exports = humanResources;