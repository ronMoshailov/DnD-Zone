function usersUpload() {
    // Fetch data from the PHP file
    showedTable = true;
    fetch('../PHP/Admin.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const tableBody = document.getElementById('usersTable');
            data.forEach(user => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = user.FullName;
                row.insertCell(1).textContent = user.Username;
                row.insertCell(2).textContent = user.Email;
                row.insertCell(3).textContent = user.Password;
            });
        })
        .catch(error => console.error('Error:', error));
    
}
