
import { BASE_URL, logoutUser } from "../auth.js";





const nav=document.getElementById('navbar');

nav.innerHTML=`
<nav class="navbar navbar-expand-lg bg-light text-dark" >
    <div class="container-fluid">
        <a class="navbar-brand" >STREAMING</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/ver_pagos/">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/CrearPagos/">Añadir pago</a>
            </li>

            <li class="nav-item" id="service"></li>


            </ul>
        
        </div>
        
   
        <a class="navbar-brand" href="/perfilusuario/">
            <div class="d-flex align-items-center">
            <span id="user-email" class="text-primary h3 box-shadow" style="margin-right: 15px ">brian</span>
            <div id=logopruebar>
            </div>
            </div>
        </a>
  
        <button id="logout" class="btn btn-danger ">Cerrar sesion</button>

  </div>
</nav>
`
let usertype = JSON.parse(localStorage.getItem("user"));
const servicio = document.getElementById('service');
const contenedor_user=document.getElementById('user-email');

const logouserescogido=document.getElementById('Logoescogido');
const logouser=document.getElementById('logopruebar');

//-------------------Codigo que se repite en todos los index.js de cada carpeta-------------------------------



if (usertype.is_superuser){
    servicio.innerHTML=`<a class="nav-link" href="/servicios/">Servicios</a>`
}

contenedor_user.innerHTML = `<p>Bienvenido ${usertype.username}</p>`

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);



//------------------------Obtener el Logo del usuario logeado en el navbar----------------

async function getLogo(){

    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const response = await fetch(BASE_URL + "login/versionamiento/v2/perfil/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        } 
    });
    const data=await response.json();


    const logo=data.results.filter(item => item.user_id === usertype.id);
    return logo;
}


//---Si existe un logo del usuario en la tabla de logos entonces se pondrá ese logo, sino se pondra el logo estatico

const logo=getLogo();

logo.then(variable => {
    if(variable.length > 0){
        logouser.innerHTML= `<img id="logousuario" src="${variable[0].perfil}" width="40" height="40" class="d-inline-block align-center" alt="">`;
    }else{
        logouser.innerHTML= `<img id="logousuario" src="/static/logouser/logo1.png" width="40" height="40" class="d-inline-block align-center" alt="">`;
    }
  });






