<?php
// Get the directory path from the query string
$directory = $_GET['directory'] ?? '';
$objects = [];

// Check if the directory exists
if (is_dir($directory)) {
    // Open the directory
    if ($handle = opendir($directory)) {
        // Read directory contents
        while (($file = readdir($handle)) !== false) {
            if ($file != "." && $file != "..") {
                // Add the object name to the list
                $objects[] = $file;
            }
        }
        closedir($handle);
    }
}

// Return the list of names as a newline-separated string
echo implode("\n", $objects);
?>
