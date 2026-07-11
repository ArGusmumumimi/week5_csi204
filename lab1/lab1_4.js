function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value;
    let errors = [];

    if (name === "") errors.push("Please enter your name");
    
    if (email === "" || !email.includes("@")) errors.push("Please enter a valid email address");
    

    if (phone === "" || phone.length !== 10 || isNaN(phone)) errors.push("Please enter a valid 10-digit phone number");
    
    if (password.length < 6) errors.push("Password must be at least 6 characters long");

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

    alert("Registration successful!");
    return true;
}