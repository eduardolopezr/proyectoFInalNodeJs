
window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        window.location.href = "login.html";
    }else{
        document.querySelector('.btn-danger').addEventListener('click', deleteEmployee);
        document.querySelector('.btn-primary').addEventListener('click', function(){
            window.location.href = "humanResources.html";
        });
    }
}
//FUNCIÓN PARA ELIMINAR UN USUARIO
function deleteEmployee(){
    var employee_id =  document.getElementById('input-id').value;
    //alert(employee_id);
    axios({
        method: 'delete',
        url:'http://localhost:3000/humanResources/delete',
        data:{
            employee_id: employee_id
        }
    }).then(function(res){
       console.log(res);
       alert("Usuario eliminado");
    }).catch(function(err){
        console.log(err);
        alert("Algo salió mal, comprueba tus datos");
    })
}