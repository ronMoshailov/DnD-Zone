<?php
// Database details
$server_name = "sql311.byethost7.com";
$username = "b7_35881778";
$password = "RonAndTomer";
$dbname = "b7_35881778_DnD";

# Create connection
$conn = new mysqli($server_name, $username, $password, $dbname);

# check connection
if ($conn->connect_error){
    echo("false");
    exit();
}

// Retrieve data from the database
$sql = "SELECT Username, Email, Password, FullName FROM Users";
$result = $conn->query($sql);

// Output data in JSON format
$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Close the database connection
$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
