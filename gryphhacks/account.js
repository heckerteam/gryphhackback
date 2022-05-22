async function signUp() {
  let f_name = document.getElementById("f_name").value;
  let l_name = document.getElementById("l_name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let isCoordinator = document.getElementById("isCoordinator").checked;
  let out = {
    f_name: f_name,
    l_name: l_name,
    email: email,
    password: password,
    is_host: isCoordinator,
  };
  console.log(out);

  fetch("http://api.sevahub.tech:8080/api/signup", {
    method: "POST",
    body: JSON.stringify(out),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.error("Something went wrong.\n" + error);
    });
}

async function login() {
  let password = document.getElementById("passwordL").value;
  let email = document.getElementById("emailL").value;
  let send = {
    email: email,
    password: password,
  };
  console.log(send);
  let a = await fetch("http://api.sevahub.tech:8080/api/login", {
    method: "POST",
    body: JSON.stringify(send),
  })
    .then((response) => {
      if (!response.ok) return Promise.reject(response);
      if(response.status == 200){
        console.log(response.body)
        location.href='index.html'\
        
      }else{
        alert("password or username is incorrect\nPlease try again")
        console.log('L Bozo')
      }
      // document.cookie = response.headers["Cookie"];
      // console.log(response.headers.get('x-auth-token'));
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.warn("Something went wrong.\n" + error);
    });
    
}
