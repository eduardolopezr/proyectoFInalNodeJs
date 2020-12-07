window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        window.location.href = "login.html";
    }else{
        alert("Para editar el usuario deberás ingresar su ID correctamente");
        document.querySelector('.btn-primary').addEventListener('click', editEmployee);
        document.querySelector('.btn-success').addEventListener('click', function(){
            window.location.href = "humanResources.html";
        });
    }
}

function editEmployee(){
    var id = document.getElementById('input-id').value;
    var name = document.getElementById('input-name').value;
    var lastName = document.getElementById('input-lastName').value;
    var department = document.getElementById('input-department').value;
    var mail = document.getElementById('input-mail').value;
    var pass =  document.getElementById('input-password').value;

    axios({
        method: 'put',
        url:'http://localhost:3000/humanResources/edit',
        data:{
            employee_id: id,
            employee_name: name,
            employee_lastName: lastName,
            employee_department: department,
            employee_mail: mail,
            employee_password: pass
            
        }
    }).then(function(res){
       console.log(res);
       alert("Empleado editado exitosamente");
    }).catch(function(err){
        console.log(err);
        alert("Algo salió, mal comprueba tus datos");
    })
}