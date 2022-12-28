const button_add = document.getElementById('anadir');
const button_update = document.getElementById('actualizar');
const logoInput = document.getElementById('logo');
const inputs = Array.from(document.querySelectorAll("input"));
const firstTwoInputs = inputs.slice(0, 2);

const logoInput_update = document.getElementById('logo_update');
const lastThreeInputs  = inputs.slice(3,5);
const seleccion=document.querySelector("select");

const btnDelete = document.getElementById("btn-delete");

const des = document.getElementById("descripcion_update");
const nam = document.getElementById("name_update");
const selectedOption = sessionStorage.getItem("selectedOption");




//-----------------------AGREGAR UN NUEVO SERVICIO---------------------------------

button_add.onclick = async function() {

    const formData = new FormData();

    // Agrega los valores de los primeros 2 inputs al formData 
    firstTwoInputs.forEach((input) => formData.append(input.name, input.value));

    // Agrega la imagen al formData
    formData.append('Logo', logoInput.files[0]);



    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    //-------------------------------------------

    let valid = true;

    formData.forEach((value, key) => {
        console.log(value, key);
      if (value === "" || value==="undefined") {
        valid = false;
        return;
      }
    });

    
    if (valid) {

        try {
            const response = await fetch("http://127.0.0.1:8000/login/versionamiento/v2/readService/",{
                method: "POST",        
                headers: {
                },
                body: formData,
        
            }); 
        
        
            Swal.fire({
                text: "Servicio Añadido",
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
    
    } else {
        Swal.fire({
            text: "Tienes que llenar todos los campos",
            icon: "error",
            });
    }
    //-------------------------------------------
    
     



    //Agrego este código porque el catch no me funciona

   


};



//-----------------------ACTUALIZAR SERVICIO--------------------------------




button_update.onclick = async function() {

    const formData = new FormData();

    // Agrega los valores de los primeros tres inputs al formData menos el último que es el logo
    lastThreeInputs.forEach((input) => formData.append(input.name, input.value));

    // Agrega la imagen al formData
    formData.append('Logo', logoInput_update.files[0]);
    


    let valid = true;

    formData.forEach((value, key) => {
        console.log(value, key);
      if (value === "" || value==="undefined") {
        valid = false;
        return;
      }
    });

    
    if (valid) {

        try {
            const response = await fetch(`http://127.0.0.1:8000/login/versionamiento/v2/readService/${seleccion.value}/`,{
                method: "put",        
                headers: {
                },
                body: formData,
        
            }); 
    
        
            Swal.fire({
                text: "Servicio Actualizado",
                icon: "success",
            });
            
        } catch (error) {
            Swal.fire({
                text: error,
                icon: "error",
                });
            }
            

    }else {
        Swal.fire({
            text: "Tienes que llenar todos los campos (Imagen, nombre, descripcion)",
            icon: "error",
            });
    };

    }


//-----------------------ELIMINAR SERVICIO--------------------------------

btnDelete.onclick = async function() {

    const { value } = await Swal.fire({
        title: `Esta seguro de eliminar el servicio seleccionado?, Recuerda que se eliminarán todos los registros asociados a este servicio.`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`,
      });

    if (value) {

        try {
            const response = await fetch(`http://127.0.0.1:8000/login/versionamiento/v2/readService/${seleccion.value}/`,{
                method: "DELETE",        
                headers: {
                },
            }); 

        
            // Muestra el mensaje de éxito y recarga la página
            Swal.fire({
                text: "Servicio Eliminado",
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

};









//-----------------------Listar servicios en MODIFICAR SERVICIO---------------------------------


const url = "http://127.0.0.1:8000/login/versionamiento/v2/readService/";

async function getServicio(){



    const response = await fetch(url);
    const data=await response.json();

    data.results.forEach((service) => {
        
         seleccion.innerHTML += renderServicio(service)

     });


     mostrar(data,seleccion);
      
     seleccion.addEventListener("change", () => {
        mostrar(data,seleccion) ;
      });


}

getServicio();

function renderServicio(service) {

    return `

    <option value=${service.id} selected>${service.name}</option>

    `;

}


function mostrar(data,seleccion) {
    const mostrar_al_modificar = data.results.filter(
        (item) => item.id === parseInt(seleccion.value)
      );
      nam.value = mostrar_al_modificar[0].name;
      des.value = mostrar_al_modificar[0].descripcion; 
}