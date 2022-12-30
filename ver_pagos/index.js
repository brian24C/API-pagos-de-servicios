import { updateTokenInterval, BASE_URL, logoutUser, validateAuth } from "../auth.js";
import { DatosFiltrados,TodosRegistros, Pagos_vencidos_UsuarioNormal, Pagos_vencidos_SuperUser} from "../reutilizable.js";

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

const tituloRealizado = document.getElementById('tituloRealizados');
const tituloVencido = document.getElementById('tituloVencidos');
//---------------------------pagos realizados--------------------------------



async function realizado(desplegar=false){


    
    let authTokens = JSON.parse(localStorage.getItem("authTokens"));

    const response = await fetch(BASE_URL + "login/versionamiento/v2/payment/",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        }    
    });
   
    ;

    const response_service = await fetch(BASE_URL + "login/versionamiento/v2/readService/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        } 
    });

    const data=await response.json()

    // Si el usuario no es superusuario entonces solo le mostrará los pagos del usuario logeado, en caso contrario se mostrará de todos los usuarios

    let PagosUsuario=DatosFiltrados(data.results, usertype, desplegar)
    tituloVencido.innerHTML="Tus Pagos Vencidos"
    tituloRealizado.innerHTML="Tus pagos Realizados"
    if(usertype.is_superuser){
        PagosUsuario=TodosRegistros(data.results,desplegar)
        tituloVencido.innerHTML="Pagos Vencidos"
        tituloRealizado.innerHTML="Pagos Realizados"
    }


    const data_service=await response_service.json();
   
    PagosUsuario.forEach((Realizado) => {
        
        const mostrar_servicio = data_service.results.filter((item) => item.id === (Realizado.service)); 
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
    

    const response2 = await fetch(BASE_URL +"login/versionamiento/v2/payment/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        }   
    });

    

    const response_service = await fetch(BASE_URL + "login/versionamiento/v2/readService/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authTokens?.access
        } 

    });
    

    const data=await response.json();
    const data2=await response2.json();
    const data_service=await response_service.json();



    // Obtengo una lista con todos los pagos vencidos del user normal logeado, si es superuser entonces obtengo todos los pagos vencidos de todos los usuarios. 
    //PagosVencidosUsuario es una variable para el "ver mas" de mi api
    const PagosExpirados=Pagos_vencidos_UsuarioNormal(data.results, data2.results, usertype);
    let PagosVencidosUsuario=TodosRegistros(PagosExpirados,desplegar);
    if(usertype.is_superuser){
        const TodosPagosVencidos=Pagos_vencidos_SuperUser(data.results,data2.results)
        PagosVencidosUsuario=TodosRegistros(TodosPagosVencidos, desplegar);  
    }

    PagosVencidosUsuario.forEach((payment) => {
        const expired=data.results.filter(item => item.pay_user_id === payment.id)
        const mostrar_servicio = data_service.results.filter((item) => item.id === (payment.service)); 
        expirados.innerHTML += renderExpirado(expired, payment, mostrar_servicio)
    });


}

expirado();



function renderExpirado(expired, payment, mostrar_servicio) {
    

    return `
    <tr >
        <td><img src="${mostrar_servicio[0].Logo}" alt="Logo del servicio" width="50"></td>
        <td>${mostrar_servicio[0].name}</td>
        <td>${payment.paymentDate}</td>
        <td>${payment.amount} $</td>
        <td>${expired[0].penalty_fee_amount}</td>
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