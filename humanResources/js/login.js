window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href = "signin.html";
        });
        document.querySelector('.btn-primary').addEventListener('click', login);
    }else{
        window.location.href="humanResources.html";
    }
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var pass =  document.getElementById('input-password').value;

    //console.log(mail,pass);

    axios({
        method: 'post',
        url:'http://localhost:3000/user/login',
        data:{
            employee_mail: mail,
            employee_password: pass
        }
    }).then(function(res){
       //console.log(res.data);
       if(res.data.code=== 200){
            //alert("Inicio exitoso");
            localStorage.setItem("token",res.data.message);
            window.location.href="humanResources.html";
       }else{
           alert("Usuario y/o contraseña incorrectos");
       }
    }).catch(function(err){
        console.log(err);
    })
}