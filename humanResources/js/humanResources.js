window.onload = init;
var headers ={};
var url = 'http://localhost:3000';
function init(){
    if(localStorage.getItem("token")){
        document.querySelector('.btn-primary').addEventListener('click', function(){
            window.location.href = "searchEmployee.html";
        });
        document.querySelector('.btn-success').addEventListener('click', function(){
            window.location.href = "editEmployee.html";
        });
        document.querySelector('.btn-info').addEventListener('click', function(){
            window.location.href = "addEmployee.html";
        });
        document.querySelector('.btn-danger').addEventListener('click', function(){
            window.location.href = "deleteEmployee.html";
        });
        //FUNCION PARA CERRAR SESIÓN
        document.querySelector('.btn-warning').addEventListener('click', function(){
            localStorage.removeItem("token");
            window.location.href="login.html";
    });
    }else{
        window.location.href="index.html";
    }
}