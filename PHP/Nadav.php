<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the numbers and operation from the form
    $num1 = $_POST["num1"];
    $num2 = $_POST["num2"];
    $operation = $_POST["operation"];

    // Initialize variables for result
    $resultNumber = 0;

    // Perform the selected operation
    switch ($operation) {
        case "+":
            $resultNumber = $num1 + $num2;
            break;
        case "-":
            $resultNumber = $num1 - $num2;
            break;
        case "*":
            $resultNumber = $num1 * $num2;
            break;
        case "/":
            if ($num2 != 0) {
                $resultNumber = $num1 / $num2;
            } else {
                $resultNumber = "Error: Division by zero";
            }
            break;
        default:
            $resultNumber = "Invalid operation";
            break;
    }

    // Output the result
    echo "$resultNumber";
}

function countdown() {
    $cntArray = ["DONE!", "1", "2", "3", "4", "5"];
    $returnArr = [];

    for ($i = 5; $i >= 0; $i--) {
        if ($i > 0)
            $returnArr[] = "Wait " . $cntArray[$i] . " seconds for calculation"; // Append element to array
        else
            $returnArr[] = $cntArray[$i];
    }

    // Echo the JSON-encoded array
    echo json_encode($returnArr);
}


if (isset($_GET["countdown"])) {
    countdown();
}

?>
