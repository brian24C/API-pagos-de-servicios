

const form = document.querySelector("form");
const inputs= document.querySelectorAll("input");
const seleccion=document.querySelector("select");


form.onsubmit = async function (event) {
    event.preventDefault();
    
    const body = {
       service: seleccion.value,
       user: 1,
    };
    inputs.forEach((input) => (body[input.name] = input.value));

    console.log(body);


    try {
    const response = await fetch("http://127.0.0.1:8000/login/versionamiento/v2/payment/",{
        method: "POST",        
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),

    }); 

    console.log(response);

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

};





//---------------------------SERVICIOSS--------------------------------

const url = "http://127.0.0.1:8000/login/versionamiento/v2/readService/";

async function getServicio(){

    const response = await fetch(url);
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


