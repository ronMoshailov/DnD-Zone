
<?php
// Database details
$server_name = "sql311.byethost7.com";
$username = "b7_35881778";
$password = "RonAndTomer";

// Variable of detection (if the data is ok)
$is_valid_username = true;
$is_valid_email = true;
$is_valid_password = true;

# Create connection
$conn = new mysqli($server_name, $username, $password,'b7_35881778_DnD'); 

# check connection
if ($conn->connect_error){
    echo "connection failed";
    exit();
}

// If POST request //
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Retrieve form data from the webpage
    $fullName_new = $_POST["fullName"];
    $username_new = $_POST["username"];
    $email_new = $_POST["email"];
    $password_new = $_POST["password"];
    $confirm_password_new = $_POST["confirm_password"];

    // Basic password match validation
    if ($password_new != $confirm_password_new) {
        echo("password not match");
        exit();
    }

    // Check email format
    $temp = $email_new;

    // Check if "@" is in the email
    if (strpos($temp, '@') !== false) {
        // Split the email at "@"
        list($localPart, $domainPart) = explode('@', $temp, 2);
        
        // Check if there are words before and after "@"
        if (!empty($localPart) && !empty($domainPart)) {
            // Check if the email ends with ".com" or ".net"
            if (substr($domainPart, -4) === ".com" || substr($domainPart, -4) === ".net") {
                // Check for a word between "@" and the last dot
                $lastDotPosition = strrpos($domainPart, '.');
                $wordBeforeLastDot = substr($domainPart, 0, $lastDotPosition);

                if (!empty($wordBeforeLastDot)) {
                    // Email is valid according to the specified criteria
                } else {
                    echo "The email must contain a word between '@' and the domain suffix.";
                    exit();
                }
            } else {
                echo "The email must end with '.com' or '.net'.";
                exit();
            }
        } else {
            echo "The email must contain words before and after '@'.";
            exit();
        }
    } else {
        echo "The email must contain an '@' symbol.";
        exit();
    }

    // Check if the Username already exist in the system 
    $check_username = "SELECT Username FROM Users WHERE Username = \"$username_new\"";
    $result = $conn->query($check_username);
    if($result->num_rows > 0){
        echo("The username is taken, please try a different username");
        exit();
    }

    // Check if the email already exist in the system 
    $check_email = "SELECT Email FROM Users WHERE Email = \"$email_new\"";
    $result = $conn->query($check_email);
    if($result->num_rows > 0){
        echo("The email is already being used");
        exit();
    }
    
    // Everything is ok so let's insert the data
    $sqlInsertData="INSERT INTO Users (Username, Email, Password, FullName) VALUES(\"$username_new\",\"$email_new\",\"$password_new\",\"$fullName_new\");";
    $conn->query($sqlInsertData);
} else {
}
?>

