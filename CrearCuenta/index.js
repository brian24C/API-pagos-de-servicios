import { validateToken,BASE_URL } from "../auth.js";


validateToken("./ver_pagos/");


const inputs= document.querySelectorAll("input");
const form = document.querySelector("form");

form.onsubmit = async function(event){
    event.preventDefault();
    
    const body = {
        "is_superuser": false,
        "is_staff": false
    };
    inputs.forEach((input) => (body[input.name] = input.value));

    

    try {
        const response = await fetch(BASE_URL + "signup/",{
            method: "POST",        
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),

        }); 
        let data = await response.json();


        //location.href = "/todo/";
        if (response.status === 201) {
            
            Swal.fire({
                text: "Cuenta creada exitosamente",
                icon: "success",
            }).then(() => {
                window.location.href = "../index.html"
            });
        
        }else {
            
            swal.fire({
            title: "Error",
            text: "Upps! Asegurese de completar todos los campos, un correo correcto (con arroba y punto)(Intente crear con otro correo, pueda que el correo ya esté usado), un password mínimo 8 caracteres.",
            icon: "error",
            confirmButtonText: "Volver a intentar"
            });
        }
    } catch (error) {
        
    Swal.fire({
      text: error,
      icon: "error",
    });
    }


};

