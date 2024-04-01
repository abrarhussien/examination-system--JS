
if(localStorage.getItem("users"))
{
    var users = JSON.parse(localStorage.getItem("users"));
} else {
    var users = [];
}

function validatePassword() {
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");
    var message = document.getElementById("message");
    var email = document.getElementById("email");
    if (confirmPassword.value!= password.value) {
        message.innerHTML = "Passwords do not match!";
        message.style.color = "red";
        document.getElementById("sign_up").disabled = true; 
    } else {
        message.innerHTML = "";
        document.getElementById("sign_up").disabled = false; 
    }
}
class User{
    constructor(name,email,password){
        this.name=name;
        this.email=email;
        this.password=password;
    }
}

function saveLocal() {
    var firstName = document.getElementById("name").value;
    var lastName = document.getElementById("name2").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var fullName = firstName + " " + lastName;

    var user = new User(fullName, email, password);

    if (localStorage.getItem("users")) {
        var users = JSON.parse(localStorage.getItem("users"));
    } else {
        var users = [];
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

