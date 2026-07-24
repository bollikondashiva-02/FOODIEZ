async function login(){
    let email=document.getElementById("emailid").value;
    let password=document.getElementById("Password").value;

    let res =await fetch("https://foodiez-api2.onrender.com/users")
    let data=await res.json();
    let founduser=false;
    data.forEach(element => {
        if(element.email===email && element.password===password){
            founduser=true;
        }
    });
   if(founduser){
    localStorage.setItem("currentUser", email);

    alert("Login Successful");

    window.location.href="dashboard.html";

   }else{
    alert("login failed")
   }
}
function togglePassword(){

    let password = document.getElementById("Password");
    let icon = document.getElementById("togglePassword");

    if(password.type === "password"){

        password.type = "text";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");

    }else{

        password.type = "password";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");

    }

}