async function savedata(event) {

    event.preventDefault(); 

    let name = document.getElementById("fullname").value.trim();
    let email = document.getElementById("Emailid").value.trim();
    let password = document.getElementById("Password").value.trim();

   
    if (name === "" || email === "" || password === "") {
        alert("⚠️ Please fill in all the fields.");
        return;
    }

    let obj = {
        name: name,
        email: email,
        password: password
    };

    let res = await fetch("https://foodiez-api2.onrender.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });

    if (res.ok) {
        alert("✅ Signup Successful!");
        window.location.href = "login.html";
    } else {
        alert("❌ Signup Failed!");
    }
}
function togglePassword() {
    let password = document.getElementById("Password");
    let icon = document.getElementById("toggleIcon");

    if (password.type === "password") {
        password.type = "text";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    } else {
        password.type = "password";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    }
}