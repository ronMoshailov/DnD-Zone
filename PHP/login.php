<?php
session_start(); // Start the session at the very top // צט אומר שזה עוזר לשמור נתונים
header('Content-Type: text/plain');

// Database details
$server_name = "sql311.byethost7.com";
$username = "b7_35881778";
$password = "RonAndTomer";
$dbname = "b7_35881778_DnD";

# Create connection
$conn = new mysqli($server_name, $username, $password, $dbname);

# check connection
if ($conn->connect_error){
    echo("connection failed");
    exit();
}

// if POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Retrieve form data from the webpage
    $email_login = $_POST["email_for_php"];
    $password_login = $_POST["password_for_php"];

    // Check if the Username already exist in the system 
    $sql = "SELECT Email, Username FROM Users WHERE Email = \"$email_login\" AND Password = \"$password_login\"";
    $result = $conn->query($sql);
    // If the user exist
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo $row["Username"];              // send the username to the JS and display the username in the header
        $conn -> close();
        exit();
    }
    else{
        echo "not user exist";
        $conn -> close();
        exit();
    }
    // Close connection to DB
    $conn -> close();
} else {
    // Redirect or handle the case where the form is not submitted through the POST method.
    echo "Error: Form not submitted.";
}
$conn->close();

?>

