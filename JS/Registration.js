// Registration back button
function returnHome() {
    if(document.querySelector('input[name="userRole"]:checked') != null){
        userRole = document.querySelector('input[name="userRole"]:checked').value;
        sessionStorage.setItem("role",userRole);
        console.log("returned home!");
    }
    window.location.href = "../index.html";
}
// Registration back button
function goRegistrationWelcomePage() {
    window.location.href = "RegisterWelcome.html";
}
// Registration back button
function openTutorial() {
    window.open("https://www.youtube.com/watch?v=0TsicWGho7c&ab_channel=SherlockHulmes", "_blank");
}

// Get elements from the user (Rgister.html)
if(document.getElementById('fullName_textfield')!=null){
    username = document.getElementById('fullName_textfield').value;
if(document.getElementById('username_textfield')!=null){
    username = document.getElementById('username_textfield').value;
}
if(document.getElementById('email_textfield')!=null){
    email = document.getElementById('email_textfield').value;
}
if(document.getElementById('password')!=null){
    password = document.getElementById('password').value;
}

    
// registration
function register(){
    
    // Prevent the default form submission
    event.preventDefault();

    // Retrieve the email, password, and userRole values
    fullName = document.getElementById('fullName_textfield').value;
    email = document.getElementById('email_textfield').value;
    username = document.getElementById('username_textfield').value;
    password = document.getElementById('password_textfield').value;
    confirmPassword = document.getElementById('confirm_password_textfield').value;

    //check Data
    if (fullName == ''){
        alert("Please insert full name.")
        return;
    }
    if (email == ''){
        alert("Please insert email.")
        return;
    }
    if (password == '' || confirmPassword == ''){
        alert("Please insert password.")
        return;
    }
    if (username == ''){
        alert("Please insert username.")
        return;
    }
    // errors
    const listErrors = ["connection failed","password not match","The username is taken, please try a different username","The email is already being used", "This is not a valid email format", "The email must end with '.com' or '.net'.","The email must contain words before and after '@'.", "The email must contain an '@' symbol.", "The email must contain a word between '@' and the domain suffix."];

    // Construct the data object to send in the request body
    var formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);

    // Send a POST request to the PHP file
    fetch('../PHP/registration.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log("data: " + data);
    if (!listErrors.includes(data.trim())) {
        goRegistrationWelcomePage();
        alert('Welcome ' + fullName + '!\nWe hope you will enjoy' );
        sessionStorage.setItem("currentUser",username);
        sessionStorage.setItem("email",email);
        sessionStorage.setItem("password",password);
    } else {
        // Handle login failure (e.g., show an error message)
        alert("Registration failed: " + data);
        // Get the form element by its ID
        var regForm = document.getElementById('registrationForm');
        // console.log(regForm)
        // Loop through each element in the form and clear its value
        for (var i = 0; i < regForm.elements.length; i++) {
            var element = regForm.elements[i];

            // Check if the element is an input, textarea, or select
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                // Clear the value of the element
                element.value = '';
            }
        }

        }
    })
    .catch(error => console.error('Error:', error));
}
}
    