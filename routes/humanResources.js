const { json } = require('express');
const express = require('express');
const humanResources = express.Router();
const db = require('../config/database');

//RUTA PARA INSTERTAR MÁS USUARIOS 
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

//RUTA PARA BORRAR USUARIOS 
humanResources.delete("/:id([0-9]{1,3})", async (req, res, next)=>{
    const query = `DELETE FROM employees WHERE employee_id = ${req.params.id}`;
    const rows = await db.query(query);
    console.log(req.params.id);
    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});

    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});


//RUTA PARA ACTUALIZAR USUARIOS 
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

//RUTA PARA BUSCAR USUARIOS 
humanResources.get("/", async (req, res, next)=>{
    const employee = await db.query("SELECT * FROM employees");
    return res.status(200).json({code: 1, message: employee});

});
humanResources.get('/:id([0-9]{1,3})', async (req, res, next)=>{
    const id = req.params.id-1;
    if (id >= 1 && id <= 722){
        const employee = await db.query("SELECT * FROM employees WHERE employee_id =" +id+";");
        return res.status(200).json({code:200, message: employee});
    }else{
        return res.status(404).send({code:404, message: "Empleado no encontrado"});
    }

});
humanResources.get('/:name([A-Za-z]+)', async (req, res, next)=>{
    const emloyee_name = req.params.name;
    const emp = await db.query("SELECT * FROM pokemon WHERE pok_name ="+emloyee_name+";");
    if(emp.length>0){
        return res.status(200).json({code:1, message: emp});
    }
    return res.status(404).send("Empleado no encontrado");

});
module.exports = humanResources;