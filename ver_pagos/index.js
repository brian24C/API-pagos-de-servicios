import { updateTokenInterval, BASE_URL, logoutUser, validateAuth } from "../auth.js";
import { fetchData } from "../reutilizable.js";

validateAuth("../index.html")

const realizados = document.querySelector("#pagos_realizados");
const expirados = document.querySelector("#pagos_expirados");

const verMasLink = document.getElementById('ver-mas-realizados');
const verMenosLink = document.getElementById('ver-menos-realizados');

const verMasLink_vencidos = document.getElementById('ver-mas-vencidos');
const verMenosLink_vencidos = document.getElementById('ver-menos-vencidos');

const servicio = document.getElementById('service');
const contenedor_user=document.getElementById('user-email');

let usertype = JSON.parse(localStorage.getItem("user"));
//---------------------------pagos realizados--------------------------------



async function realizado(desplegar=false){

    console.log(usertype);
    
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const response = await fetch(BASE_URL + "login/versionamiento/v2/payment/",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        }    
    });
   
    const data=await response.json();

    const response_service = await fetch(BASE_URL + "login/versionamiento/v2/readService/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        } 
    });
    const data_service=await response_service.json();
    
    let results = data.results.slice(0, 2)
    if(desplegar){
         results=data.results.slice(2, data.results.length+1)
    };


    results.forEach((Realizado) => {
        
        const mostrar_servicio = data_service.results.filter(
            (item) => item.id === (Realizado.service)
          ); 
        

        realizados.innerHTML += renderRealizado(Realizado, mostrar_servicio)

     });

     

}

realizado();





function renderRealizado(Realizado, nombre_servicio) {

    return `
    <tr>
        <td><img src="${nombre_servicio[0].Logo}" alt="Logo del servicio" width="50"></td>
        <td>${nombre_servicio[0].name}</td>
        <td>${Realizado.paymentDate}</td>
        <td>${Realizado.amount} $</td>
    </tr>
    `;

}




verMasLink.onclick = function() {

    verMasLink.style.display = "none";
    verMenosLink.style.display = 'block';
    return realizado(true);

}

verMenosLink.onclick = function(){
    location.reload();
}




//---------------------------pagos VENCIDOS--------------------------------



async function expirado(desplegar=false){
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const response = await fetch(BASE_URL + "login/versionamiento/v2/expired/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        } 

    });
    const data=await response.json();

    const response2 = await fetch(BASE_URL +"login/versionamiento/v2/payment/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        }   
    });

    const data2=await response2.json();

    const response_service = await fetch(BASE_URL + "login/versionamiento/v2/readService/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        } 

    });
    const data_service=await response_service.json();

    let results = data.results.slice(0, 2)
    if(desplegar){
         results=data.results.slice(2, data.results.length+1)
    };


    results.forEach((expirado) => {
        const payment=data2.results.filter(item => item.id === expirado.pay_user_id);
        const mostrar_servicio = data_service.results.filter(
            (item) => item.id === (payment[0].service)
          ); 

        expirados.innerHTML += renderExpirado(expirado, payment, mostrar_servicio)

     });


}

expirado();



function renderExpirado(expirado, payment, mostrar_servicio) {

    return `
    <tr >
        <td><img src="${mostrar_servicio[0].Logo}" alt="Logo del servicio" width="50"></td>
        <td>${mostrar_servicio[0].name}</td>
        <td>${payment[0].paymentDate}</td>
        <td>${payment[0].amount} $</td>
        <td>${expirado.penalty_fee_amount}</td>
        <td>${expirado.pay_user_id}</td>
    </tr>
    `;

}


verMasLink_vencidos.onclick = function() {

    verMasLink_vencidos.style.display = "none";
    verMenosLink_vencidos.style.display = 'block';
    return expirado(true);

}

verMenosLink_vencidos.onclick = function(){
    location.reload();
}




updateTokenInterval();