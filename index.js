
import { validateToken,BASE_URL } from "./auth.js";
import validate from "./validation.js";


validateToken("./ver_pagos/");



const inputs= document.querySelectorAll("input");
const form = document.querySelector("form");

form.onsubmit = async function(event){
    event.preventDefault();
    
    const body = {
    };
    inputs.forEach((input) => (body[input.name] = input.value));

    

    try {
        const response = await fetch("http://127.0.0.1:8000/login/",{
            method: "POST",        
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),

        }); 
        let data = await response.json();
  
       
        //location.href = "/todo/";
        if (response.status === 200) {

            let { tokens, data: user } = data
            localStorage.setItem("authTokens", JSON.stringify(tokens));
            localStorage.setItem("user", JSON.stringify(user));

            window.location.replace("./ver_pagos/");
 
   

        } else {
            
            swal.fire({
            title: "Error",
            text: "El correo o contraseña es incorrecta",
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

