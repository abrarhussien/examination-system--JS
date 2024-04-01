function validateSignIn() {
    var signInEmail = document.getElementById("email2").value;
    var signInPassword = document.getElementById("password2").value;
    var message = document.getElementById("message2");

    if (localStorage.getItem("users")) {
        var users = JSON.parse(localStorage.getItem("users"));

        var foundUser = users.find(user => user.email === signInEmail && user.password === signInPassword);

        if (foundUser) {
            var currentUser = foundUser;
            console.log(foundUser);
            var name = localStorage.setItem("Cuser", currentUser.name);
            console.log(name);
            message.innerHTML = "Sign-in successful!";
            message.style.color = "green";
            // document.getElementById("sign_in").disabled = false;
            location.replace("index.html");
        } else {

            message.innerHTML = "Invalid email or password! Please try again!";
            message.style.color = "red";
            // document.getElementById("sign_in").disabled = true;
        }
    } else {

        message.innerHTML = "No user data found. Please sign up first!";
        message.style.color = "red";
    }

    return false;
}
