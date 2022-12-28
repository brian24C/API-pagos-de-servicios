
let usertype = JSON.parse(localStorage.getItem("user"));

if (!usertype.is_superuser){
    window.location.href = "../ver_pagos/";
    alert('No tienes permiso para acceder a esta página');
}

