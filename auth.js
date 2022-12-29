var BASE_URL="https://proyecto-unidad-5-production.up.railway.app/"

function validateAuth(archivoRedirect) {
  let token = localStorage.getItem("authTokens");
  if (!token) {
    window.location.href = archivoRedirect;
  }
}

function validateToken(archivoRedirect) {
  let token = localStorage.getItem("authTokens");
  console.log(token);
  if (token) {
    window.location.href = archivoRedirect;
  }
}

function updateTokenInterval() {
    let fourMinutes=1000*60*25 //25 minutes
    let interval = setInterval(() => {
        updateToken();
      }, fourMinutes);
      return () => clearInterval(interval);
}

let updateToken = async () => {
  console.log("UPDATE TOKEN CALLED");
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));

  let response = await fetch(BASE_URL + "jwt/regresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: authTokens?.refresh }),
  });
  let data = await response.json();
  if (response.status === 200) {
    authTokens.access=data.access
    localStorage.setItem("authTokens", JSON.stringify(authTokens));
  } else {
    logoutUser();
  }

};

let logoutUser = () => {
  localStorage.removeItem("authTokens");
  localStorage.removeItem("user");
  window.location.replace("../index.html");
};

export { validateAuth, validateToken, updateTokenInterval,logoutUser, BASE_URL };