
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


export {fetchData, validacion};