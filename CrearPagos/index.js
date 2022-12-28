
import { updateTokenInterval, BASE_URL, logoutUser } from "../auth.js";
import { validacion } from "../reutilizable.js";

const form = document.querySelector("form");
const inputs= document.querySelectorAll("input");
const seleccion=document.querySelector("select");
let usertype = JSON.parse(localStorage.getItem("user"));

form.onsubmit = async function (event) {
    event.preventDefault();

    console.log(usertype);

    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const body = {
       service: seleccion.value,
       user: 1,
    };
    inputs.forEach((input) => (body[input.name] = input.value));


    let valid=validacion(inputs)

    if (valid) {
    try {
        const response = await fetch(BASE_URL + "login/versionamiento/v2/payment/",{
            method: "POST",        
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(body),

        }); 

        Swal.fire({
            text: "Pago creado creado",
            icon: "success",
        });
        
        } catch (error) {
            Swal.fire({
            text: error,
            icon: "error",
            });
        }
    }else{
            Swal.fire({
                text: "Tienes que llenar todos los campos",
                icon: "error",
                });
    }

};





//---------------------------SERVICIOSS--------------------------------


async function getServicio(){
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const response = await fetch(BASE_URL + "login/versionamiento/v2/readService/",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access

    }});
    const data=await response.json();

    data.results.forEach((service) => {
        
         seleccion.innerHTML += renderServicio(service)


     });


}

getServicio();



function renderServicio(service) {

    return `

    <option value=${service.id} selected>${service.name}</option>

    `;

}


