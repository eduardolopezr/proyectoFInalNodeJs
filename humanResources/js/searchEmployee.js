window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        window.location.href = "login.html";
    }else{
        //
        document.querySelector('.btn-primary').addEventListener('click', search);
        document.querySelector('.btn-success').addEventListener('click', function(){
            window.location.href = "humanResources.html";
        });
    }
}
//FUNCIÓN PARA BUSCAR USUARIOS
function search(){

    var employee_id =  document.getElementById('input-id').value;

    axios({
        method: 'post',
        url:'http://localhost:3000/humanResources/search',
        data:{
            employee_id: employee_id
        }
    }).then(function(res){
        alert("Usuario mostrado por consola :D");
       console.log(res);
    }).catch(function(err){
        console.log(err);
    })
}