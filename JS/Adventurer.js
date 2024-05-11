const audioFileInput = document.getElementById('audioFile');
    const audioPlayer = document.getElementById('audioPlayer');

    audioFileInput.addEventListener('change', function() {
      const file = this.files[0];
      const objectURL = URL.createObjectURL(file);
      audioPlayer.src = objectURL;
    });

function updateFileName() {
  const selectedFile = document.getElementById('audioFile').files[0];
  const fileNameContainer = document.getElementById('selectedFileName');
  if (selectedFile) {
    fileNameContainer.textContent = selectedFile.name;
  } else {
    fileNameContainer.textContent = 'No file chosen';
  }
}

function saveNotes() {   
    // Get the data you want to send to the PHP script
    var sessionDate = document.getElementById("sessionDate").value;
    
    var sessionNotes = document.getElementById("sessionNotes").value.toString();
    if (sessionDate.trim() === '') {
        window.alert("Please specify a date before saving the note.");
        return;
    }

    if (sessionNotes.trim() === '') {
        window.alert("No note to save.");
        return
    }

    // Prepare the data to be sent as JSON
    var data = {
        sessionDate: sessionDate,
        sessionNotes: sessionNotes,
        username: username
    };

    // Send a POST request to the PHP script
    fetch('../PHP/Adventurer.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        document.getElementById("sessionDate").value = '';
        document.getElementById("sessionNotes").value = '';
        return response.text();
    })
    .then(data => {
        
        console.log(data); // Response from the PHP script
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Function to fetch and display the list of text files
function uploadNotes() {
    fetch('../PHP/Adventurer.php?username=' + encodeURIComponent(username), {
        method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayFiles(data);
        })
        .catch(error => {
            console.error('Error fetching text files:', error);
        });
}

// Function to display the list of text files in the modal
function displayFiles(files) {
    // Clear previous content in the modal
    document.getElementById('notesBody').innerHTML = '';

    // Create a list element to hold the file names
    var fileList = document.createElement('ul');

    // Iterate through the list of files and create list items for each
    files.forEach(function(fileName) {
        var listItem = document.createElement('li');
        listItem.textContent = fileName;
        // Add an event listener to handle file selection
        listItem.addEventListener('click', function() {
            handleFileSelection(fileName);
        });
        fileList.appendChild(listItem);
    });

    // Append the list of files to the modal body
    document.getElementById('notesBody').appendChild(fileList);
}

function handleFileSelection(fileName) {
    // Fetch the content of the selected text file
    fetch('../PHP/Adventurer.php?fileName=' + encodeURIComponent(fileName) + '&username=' + encodeURIComponent(username), {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Assuming the content is plain text
    })
    .then(data => {
        // Display the content in the textarea
        document.getElementById('sessionNotes').value = data;
        $('#notesModal').modal('hide');
    })
    .catch(error => {
        console.error('Error fetching file content:', error);
    });
}
