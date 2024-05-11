<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the data sent from the JavaScript
$data = json_decode(file_get_contents("php://input"));

// Extract the session date, notes, and username
$sessionDate = $data->sessionDate;
$sessionNotes = $data->sessionNotes;
$username = $data->username;


    // Log the session date to check its value
    error_log("Session Date: " . $sessionDate);

    // Ensure the session date is not empty
    if (empty($sessionDate)) {
        die("Error: Session Date is empty");
    }

    // Construct the filename with proper extension
    $filename = $sessionDate . ".txt";

    // Specify the destination folder (adjust the path as needed)
    $destinationFolder = "../Notes/" . $username;

    // Create the directory if it doesn't exist
    if (!is_dir($destinationFolder)) {
        if (!mkdir($destinationFolder, 0777, true)) {
            die("Failed to create directory $destinationFolder");
        }
    }

    // Save the notes to a text file in the destination folder
    $filePath = $destinationFolder . "/" . $filename;
    $file = fopen($filePath, "w");
    if ($file) {
        // Write session notes to the file
        fwrite($file, $sessionNotes);
        fclose($file);
        echo "Note saved as $filename in $destinationFolder";
    } else {
        echo "Error saving note";
    }
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['fileName'])){
        getFile();
    }
    else{
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $directory = '../Notes/' . $username . '/'; 
    // Get all text files in the directory
    $files = scandir($directory);
    $textFiles = array_filter($files, function($file) {
        return pathinfo($file, PATHINFO_EXTENSION) === 'txt';
    });

    // Output JSON response
    header('Content-Type: application/json');
    echo json_encode(array_values($textFiles));
    }
}

function getFile() {
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $filename = $_GET['fileName'];
    $filePath = '../Notes/' . $username . '/' . $filename; 
    // Check if the file exists
    if (file_exists($filePath)) {
        // Read the contents of the file
        $fileContent = file_get_contents($filePath);
        
        // Output the file content
        echo $fileContent;
    } else {
        // File not found, return an error message
        echo "Error: File not found";
    }
}
?>
