
import { updateTokenInterval, BASE_URL, logoutUser , validateAuth} from "../auth.js";





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
        
   
        <a class="navbar-brand" href="#">
            <div class="d-flex align-items-center">
            <span id="user-email" class="text-primary h3 box-shadow" style="margin-right: 15px ">brian</span>
            <img src="${BASE_URL}media/LogoUSER/logo1.png/" width="40" height="40" class="d-inline-block align-center" alt="">
            </div>
        </a>
  
        <button id="logout" class="btn btn-danger ">Cerrar sesion</button>

  </div>
</nav>
`
let usertype = JSON.parse(localStorage.getItem("user"));
const servicio = document.getElementById('service');
const contenedor_user=document.getElementById('user-email');


//-------------------Codigo que se repite en todos los index.js de cada carpeta-------------------------------


if (usertype.is_superuser){
    servicio.innerHTML=`<a class="nav-link" href="/servicios/">Servicios</a>`
}

contenedor_user.innerHTML = `<p>Bienvenido ${usertype.username}</p>`

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", logoutUser);



updateTokenInterval();




