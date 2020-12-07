window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href = "login.html";
        });
        document.querySelector('.btn-primary').addEventListener('click', signin);
    }else{
        window.location.href="humanResources.html";
    }
}
//FUNCIÓN PARA REGISTRARSE
function signin(){
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
       alert("Registro exitoso");
       window.location.href = "login.html";
    }).catch(function(err){
        console.log(err);
    })
}