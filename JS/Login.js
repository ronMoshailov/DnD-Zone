// login to logout
function checkLogin(){
    // Prevent the default form submission
    event.preventDefault();

    // Retrieve the email, password, and userRole values
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    userRole = document.querySelector('input[name="userRole"]:checked').value;
    
    //check Data
    if (email == ''){
        alert("Please insert email.")
        return;
    }
    if (password == ''){
        alert("Please insert password.")
        return;
    }

    // Construct the data object to send in the request body
    var formData = new FormData();
    formData.append('email_for_php', email);
    formData.append('password_for_php', password);
    formData.append('userRole', userRole);

    // Send a POST request to the PHP file
    fetch('../PHP/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
    if (data.trim() != "connection failed" && data.trim()!= "not user exist" && data.trim()!= "Error: Form not submitted.") { // Assuming the response is "false" as string
        username = data.trim();
        console.log("data!=false.");
        console.log("username: " + data);
        sessionStorage.setItem("currentUser",username);
        sessionStorage.setItem("email",email);
        sessionStorage.setItem("password",password);
        sessionStorage.setItem("role",userRole);

        document.getElementById('updateEmail').value = email;
        document.getElementById('updatePassword').value = password;
        document.getElementById('updateUsername').value = username;





        document.getElementById('loginButton').style.display = "none";
        document.getElementById('logoutButton').style.display = "flex";
        document.getElementById('userInfo').textContent = username;
        document.getElementById('userInfo').style.display = "flex";
        document.getElementById('mobile-logout').style.display = "flex";
        // Close the modal if login is successful
        $('#loginModal').modal('hide');
        document.getElementById("mobile-login").style.display = 'none';
        aprilFools();
        //console.log(userRole);
        
    } else {
        // Handle login failure (e.g., show an error message)
        alert("Login failed. Please check your credentials.");
        }
    })
    .catch(error => console.error('Error:', error));
}

// is already logged user 
document.addEventListener('DOMContentLoaded', function() {

    // 1
    if(sessionStorage.getItem("email")!=null ){
        username = sessionStorage.getItem("currentUser");
        email = sessionStorage.getItem("email");
        password = sessionStorage.getItem("password");
        userRole = sessionStorage.getItem("role");
        // document.getElementById('userInfo').textContent = username;
        document.getElementById('userInfo').innerHTML = username;
        // console.log("test: ");
        // console.log("test: " + username);
        document.getElementById('userInfo').style.display = "flex";
        document.getElementById('loginButton').style.display = "none";
        document.getElementById('logoutButton').style.display = "flex";
        document.getElementById('mobile-login').style.display = "none";
        document.getElementById('mobile-logout').style.display = "flex";

        
    }
    console.log("The length of session storage is: " + sessionStorage.length);
    console.log("sessionStorage[0] is: " + sessionStorage[0]);

// 2
document.getElementById('update_form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this); // 'this' refers to the form element
    fetch('../PHP/update.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Assuming the server response is text
    .then(text => {
    console.log("response: '" + text + "'"); // Log the response with quotes to visualize spaces
        text = text.trim(); // Trim whitespace from the response
        if (text === "Got information") {
            // Insert information to sessionStorage
            sessionStorage.setItem("currentUser",document.getElementById("updateUsername").value);
            sessionStorage.setItem("password",document.getElementById("updatePassword").value);
            sessionStorage.setItem("role",document.querySelector('#register_radio input[type="radio"]:checked').value);
            // Update global variables
            username = sessionStorage.getItem("currentUser");
            password = sessionStorage.getItem("password");
            userRole = sessionStorage.getItem("role");
            // 
            console.log("updated username: " + username);
            document.getElementById('userInfo').textContent = username;
            // You can also display a success message or update the UI as needed
            alert('Update successful!');
            $('#updateBody').closest('.modal').modal('hide');
        }
    })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors, such as by displaying an error message
        });
    });
});

// logout
function logout(){
    
    // Clear Variables
    console.log("public username that logged off: " + username);
    email = null;
    username = null;
    password = null;
    userRole = null;

    // Clear Session
    sessionStorage.clear();
    console.log("The length of session storage after logout is: " + sessionStorage.length);


    // Clear span of the username
    document.getElementById('userInfo').textContent = null;

    // Swap buttons
    document.getElementById('loginButton').style.display = "flex";
    document.getElementById('logoutButton').style.display = "none";
    document.getElementById('userInfo').style.display = "none";

    document.getElementById('mobile-login').style.display = "flex";
    document.getElementById('mobile-logout').style.display = "none";

}

function aprilFools() {
    var now = new Date();
    var month = now.getMonth(); // January is 0, so April will be 3
    var day = now.getDate();
    var hour = now.getHours();

    // Check if it's April 1st and time is between 8am and 9am
    if (month === 3 && day === 1 && hour >= 7 && hour < 23) {
        const jokeWindow = window.open(); 
        jokeWindow.document.open();
        jokeWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hack Alert</title>
    <style>
    body {
    background-color: black;
    color: red;
    font-family: 'Courier New', Courier, monospace;
}

.alert-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 3px solid red;
    background-color: #333;
    text-align: center;
}

.alert-container h1 {
    font-size: 48px;
    margin-bottom: 20px;
    animation: blinker 1.5s linear infinite;
}

.alert-container p {
    font-size: 20px;
    line-height: 1.5;
}

.alert-container button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 20px;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
}

@keyframes blinker {  
    50% { opacity: 0; }
}

    </style>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="alert-container">
        <h1>WARNING!</h1>
        <p>Your computer has been hacked. Your personal data is at risk.</p>
        <p>Please contact support immediately at <strong>1-800-XXX-XXXX</strong>.</p>
        <button>Get Help</button>
    </div>
</body>
</html>

        `);
        jokeWindow.document.close();
    }
}



