<?php
// Get the filename from the query parameter
$file = isset($_GET['file']) ? $_GET['file'] : '';

if ($file !== '') {
    // Set the appropriate headers to suggest a filename and handle the download
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="newSheet.pdf"');
    header('Content-Length: ' . filesize($file));

    // Output the file
    readfile($file);
} else {
    // Handle error: file not provided
    echo 'Error: File not provided.';
}
?>
