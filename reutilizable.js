
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

function validate(params) {
    let c = 0;
    params.forEach((value) => {
      if (value === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "All fields are required!",
        });
        c++;
      }
    });
    return c===0;
  }
  


export {fetchData, validate};