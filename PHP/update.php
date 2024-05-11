<?php
session_start(); // Start the session at the very top // צט אומר שזה עוזר לשמור נתונים
header('Content-Type: text/plain');

// Database details
$server_name = "sql311.byethost7.com";
$username = "b7_35881778";
$password = "RonAndTomer";
$dbname = "b7_35881778_DnD";

# Create connection
$conn = new mysqli($server_name, $username, $password, $dbname);    // connect to the DB

# check connection
if ($conn->connect_error){
    die("false_in_update.php");
}

// If this is "POST" request
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Retrieve form data from the webpage
    $email_update = $_POST["email_for_php"];
    $fullName_update = $_POST["fullName_for_php"];
    $username_update = $_POST["username_for_php"];
    $password_update = $_POST["password_for_php"];

    // Update the data
    $sql = "UPDATE Users
            SET Username = \"$username_update\", Password = \"$password_update\", FullName = \"$fullName_update\"
            WHERE Email = \"$email_update\"";
    $result = $conn->query($sql);
    echo "Got information";

}
?>

