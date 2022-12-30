import { updateTokenInterval, BASE_URL, logoutUser, validateAuth } from "../auth.js";
import { validacion_objeto } from "../reutilizable.js";

const inputPerfil = document.getElementById('perfil');
const button_add = document.getElementById('actualizar');
let usertype = JSON.parse(localStorage.getItem("user"));
let LogoEscogid = document.getElementById('Logoescogido');




button_add.onclick = async function() {

    let authTokens = JSON.parse(localStorage.getItem("authTokens"));
    

    const formData = new FormData();
    // Agrega la imagen al formData
    formData.append('perfil', inputPerfil.files[0]);
    formData.append('user_id', usertype.id);

    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    let valid=validacion_objeto(formData);
    console.log(valid);
    
    if (valid) {

        //---------------------------------------------------------
        
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
        console.log(logo);
        console.log(logo[0]);
         //---------------------------------------------------------

        if (logo.length === 0){

            try {
                const response = await fetch(BASE_URL + "login/versionamiento/v2/perfil/",{
                    method: "POST",        

                    body: formData,
            
                }); 
                
                //LogoEscogido.innerHTML=`<img class="card-img-top" src="${BASE_URL}media/FotoPerfil/${formData.get("perfil").name}" alt="Card image cap">`
            
                Swal.fire({
                    text: "Logo de usuario añadido exitosamente",
                    icon: "success",
                }).then(() => {
                    location.reload();
                });
                
            } catch (error) {
                Swal.fire({
                text: error,
                icon: "error",
                });
                }


        }else {
            
            try {
                const response = await fetch(BASE_URL + `login/versionamiento/v2/perfil/${logo[0].id}/`,{
                    method: "put",        

                    body: formData,
            
                }); 
                
                //LogoEscogido.innerHTML=`<img class="card-img-top" src="${BASE_URL}media/FotoPerfil/${formData.get("perfil").name}" alt="Card image cap">`
            
                Swal.fire({
                    text: "Logo de usuario Actualizado existosamente",
                    icon: "success",
                }).then(() => {
                    location.reload();
                });
                
            } catch (error) {
                Swal.fire({
                text: error,
                icon: "error",
                });
                }

        }


    } else {
        Swal.fire({
            text: "Tienes que Elegir una imagen",
            icon: "error",
            });
    }



    }




    //-------------------------------------------Obtener el logo en la opcion de cambiar logos--------------------------------

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
    console.log(variable)
    if(variable.length > 0){
        //logouser.src=`${variable[0].perfil}`
        //logouser.innerHTML= `<img id="logousuario" src="${variable[0].perfil}" width="40" height="40" class="d-inline-block align-center" alt="">`;
        LogoEscogid.src=`${variable[0].perfil}`
    }else{
        LogoEscogid.src="/static/logouser/logo1.png"
        //logouser.innerHTML= `<img id="logousuario" src="/static/logouser/logo1.png" width="40" height="40" class="d-inline-block align-center" alt="">`;
    }
  });

updateTokenInterval();
