
const fetchData=async (url, method="GET", authTokens, header_content=null, body=null) => {

    const options = {

        method: method,
        headers: {
            'Authorization': 'Bearer ' + authTokens?.access,
        }

    }
    if (body) options.body = JSON.stringify(body)

    console.log(options);

    const response = await fetch(url, options)
    const data = await response.json()
    return data


}


function validacion(params) {
  let valid = true;
  params.forEach((input) => {
    console.log(input.name, ":", input.value)
    if (input.value === "") {
      valid = false;
      return valid;
    }
  });
  return valid

}

function validacion_objeto(params) {
  let valid = true;
  params.forEach((value, key) => {
    if (value === "" || value==="undefined") {
      valid = false;
      return valid;
    }
  
  });
  return valid;

}



function DatosFiltrados(params, usertype, desplegar) {

  const data_filtrada = params.filter((item) => item.user === (usertype.id)); 
  
  
  let results = data_filtrada.slice(0, 2)
  if(desplegar){
       results=data_filtrada.slice(2, data_filtrada.length+1)
  };

  return results;

}

function TodosRegistros(params,desplegar) {


  let results = params.slice(0, 2)
  if(desplegar){
       results=params.slice(2, params.length+1)
  };

  return results;

}


// Retorna todos los pagos vencidos (Payment_user) del usuario logeado normal
function Pagos_vencidos_UsuarioNormal(results,data2, usertype) {

  let PagosExpirados=[]
  results.forEach((expirado) => {
      const payment = data2.filter((item) => {
          return item.id === expirado.pay_user_id && item.user === usertype.id;
        });

      if (Array.isArray(payment) && payment.length > 0){
          PagosExpirados.push(payment[0])
      }
   });

   return PagosExpirados;

}

//Retorna todos los pagos vencidos de todos los usuarios , ya que el usuario logeado es un SUPERUSUARIO

function Pagos_vencidos_SuperUser(results,data2) {

  let Pagos_superUser=[]
  results.forEach((expirado) => {
      const payment=data2.filter(item => item.id === expirado.pay_user_id);
      Pagos_superUser.push(payment[0])
      }
   );
   return Pagos_superUser;

}





export {fetchData, validacion, validacion_objeto, DatosFiltrados, TodosRegistros, Pagos_vencidos_UsuarioNormal, Pagos_vencidos_SuperUser};