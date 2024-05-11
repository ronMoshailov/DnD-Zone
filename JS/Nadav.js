// Function to call the countdown
function callCount() {
    return fetch('PHP/Nadav.php?countdown=1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(async data => {
            if (Array.isArray(data)) {
                // Iterate over each value in the array with a 1 second delay
                for (const value of data) {
                    document.getElementById('resultString').innerHTML = value;
                    await sleep(1000); // Wait for 1 second
                }
            } else {
                throw new Error('Data is not an array');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

// Sleep function to pause execution for a specified duration
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('calcBtn').addEventListener('click', function() {
    document.getElementById('resultNumber').innerHTML = '';

    // Call callCount and wait for it to finish before proceeding with form data processing
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    if(num1 != "" && num1 != null && num2 != "" && num2 != null){
        callCount().then(() => {
        
            console.log("here");
            const operation = document.getElementById('operation').value;
            document.getElementById('resultNumber').innerHTML ='';

            // Prepare form data
            const formData = new FormData();
            formData.append('num1', num1);
            formData.append('num2', num2);
            formData.append('operation', operation);

            fetch('PHP/Nadav.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById('resultNumber').innerHTML = num1 + operation + num2 + '=' + data;
            })
            .catch(error => console.error('Error:', error));
            });
            
        }
        else{
            document.getElementById('resultNumber').innerHTML = "Some of the values are empty";
        }
        
});
