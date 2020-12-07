window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        window.location.href = "login.html";
    }else{
        document.querySelector('.btn-primary').addEventListener('click', addEmployee);
        document.querySelector('.btn-success').addEventListener('click', function(){
            window.location.href = "humanResources.html";
        });
    }
}
//FUNCIÓN PARA AÑADIR NUEVO USUARIO
function addEmployee(){
    var name = document.getElementById('input-name').value;
    var lastName = document.getElementById('input-lastName').value;
    var department = document.getElementById('input-department').value;
    var mail = document.getElementById('input-mail').value;
    var pass =  document.getElementById('input-password').value;

    axios({
        method: 'post',
        url:'http://localhost:3000/user/signin',
        data:{
            employee_name: name,
            employee_lastName: lastName,
            employee_department: department,
            employee_mail: mail,
            employee_password: pass
            
        }
    }).then(function(res){
       console.log(res);
       alert("Empleado añadido exitosamente");
       window.location.href = "addEmployee.html";
    }).catch(function(err){
        console.log(err);
        alert("Algo salió, mal comprueba tus datos");
    })
}