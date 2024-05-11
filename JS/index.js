

    // Click on logo will lead to home-page 
    var logo_element = document.getElementById('logo');
    if(logo_element){
        logo_element.addEventListener('click', function() {
    displayHomePageButton();
    });
    }
    // Registration back button
    function go_platform() {
        window.location.href = "../play_platform.html";
    }
    // CSS for the play button of thumbnail
    // document.querySelector('#centered-image').addEventListener('mouseover', function() {
    //     document.querySelector('#customThumbnail').classList.add('hovered');
    // });

    // document.querySelector('#centered-image').addEventListener('mouseout', function() {
    //     document.querySelector('#customThumbnail').classList.remove('hovered');
    // });
    // display home page
    function displayHomePageButton() {
        document.getElementById("mainPage").style.display = "flex";
        document.getElementById("aboutPage").style.display = "none";
        document.getElementById("racesPage").style.display = "none";
        document.getElementById("classesPage").style.display = "none";
        document.getElementById("playPage").style.display = "none";
        document.getElementById("AdventurerPage").style.display = "none";
        document.getElementById("AdminPage").style.display = "none";
        document.getElementById("NadavPage").style.display = "none";
    }
    // display About page
    function displayAboutPageButton() {
        document.getElementById("mainPage").style.display = "none";
        document.getElementById("aboutPage").style.display = "flex";
        document.getElementById("racesPage").style.display = "none";
        document.getElementById("classesPage").style.display = "none";
        document.getElementById("playPage").style.display = "none";
        document.getElementById("AdventurerPage").style.display = "none";
        document.getElementById("AdminPage").style.display = "none";
            document.getElementById("NadavPage").style.display = "none";
    }
    // display Races page
    function displayRacesPageButton() {
        document.getElementById("mainPage").style.display = "none";
        document.getElementById("aboutPage").style.display = "none";
        document.getElementById("racesPage").style.display = "flex";
        document.getElementById("classesPage").style.display = "none";
        document.getElementById("playPage").style.display = "none";
        document.getElementById("AdventurerPage").style.display = "none";
        document.getElementById("AdminPage").style.display = "none";
            document.getElementById("NadavPage").style.display = "none";
    }
    // display classes page
    function displayClassesPageButton() {
        document.getElementById("mainPage").style.display = "none";
        document.getElementById("aboutPage").style.display = "none";
        document.getElementById("racesPage").style.display = "none";
        document.getElementById("classesPage").style.display = "flex";
        document.getElementById("playPage").style.display = "none";
        document.getElementById("AdventurerPage").style.display = "none";
        document.getElementById("AdminPage").style.display = "none";
        document.getElementById("NadavPage").style.display = "none";
    }
    // display play page
    function displayPlayPageButton() {
        username = sessionStorage.getItem('currentUser');
        if (username == 'nadav'){
            document.getElementById("mainPage").style.display = "none";
            document.getElementById("aboutPage").style.display = "none";
            document.getElementById("racesPage").style.display = "none";
            document.getElementById("classesPage").style.display = "none";
            document.getElementById("AdventurerPage").style.display = "none";
            document.getElementById("playPage").style.display = "none";
            document.getElementById("AdminPage").style.display = "none";
            document.getElementById("NadavPage").style.display = "flex";
            return;
        }
        if (username == 'Admin')
        {
            document.getElementById("mainPage").style.display = "none";
            document.getElementById("aboutPage").style.display = "none";
            document.getElementById("racesPage").style.display = "none";
            document.getElementById("classesPage").style.display = "none";
            document.getElementById("playPage").style.display = "none";
            document.getElementById("AdventurerPage").style.display = "none";
            document.getElementById("AdminPage").style.display = "flex";
            document.getElementById("NadavPage").style.display = "none";
            if(showedTable == false){
                usersUpload();
            }
        }
        else if(userRole == 'dmRole')
        {
            document.getElementById("mainPage").style.display = "none";
            document.getElementById("aboutPage").style.display = "none";
            document.getElementById("racesPage").style.display = "none";
            document.getElementById("classesPage").style.display = "none";
            document.getElementById("AdventurerPage").style.display = "none";
            document.getElementById("playPage").style.display = "flex";
            document.getElementById("AdminPage").style.display = "none";
            document.getElementById("NadavPage").style.display = "none";
            go_platform();
            // UploadPlay();
        }
        else if (userRole == 'playerRole')
        {
            document.getElementById("mainPage").style.display = "none";
            document.getElementById("aboutPage").style.display = "none";
            document.getElementById("racesPage").style.display = "none";
            document.getElementById("classesPage").style.display = "none";
            document.getElementById("playPage").style.display = "none";
            document.getElementById("AdventurerPage").style.display = "flex";
            document.getElementById("AdminPage").style.display = "none";
            document.getElementById("NadavPage").style.display = "none";
            // Get username from session storage and passing to form
            var username = sessionStorage.getItem("username");
            document.getEle
        }
        
    }

    // display registration page
    function displayRegistrationPageButton() {
        window.location.href = "../Register.html";
    }

function uploadLearn(){
    window.location.href = "../howToPlay.html";

}






// bubble butten
const buttons = document.querySelectorAll('a.bubbleButton');
buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Check if the clicked element has the class "bubbleButton"
        if (e.target.classList.contains('bubbleButton')) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripples = document.createElement('span');
            ripples.className = 'bubble-effect';
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 1000);
        }
    });
});

// Thumbnail & Video
// document.getElementById('centered-image').addEventListener('click', function() {
//     // Remove the thumbnail
//     document.getElementById("customThumbnail").style.display = 'none';
//     // Remove the 2 buttons
//     var centerImages = document.getElementsByClassName("center-image");
//     for (var i = 0; i < centerImages.length; i++) {
//         centerImages[i].style.display = 'none';
//     } 
//     //play the video
//     var video = document.getElementById('youtubeVideo');
//     video.style.display = 'block'; // Show the iframe
//     video.src += "&autoplay=1"; // Add autoplay parameter to start the video
    
// });

// Open facebook after click on icon
document.getElementById('facebook_icon').addEventListener('click', function() {
    window.open('http://www.facebook.com', '_blank');
});
// Open telegram after click on icon
// document.getElementById('telegram_icon').addEventListener('click', function() {
//     window.open('https://web.telegram.org/', '_blank');
// });
// Open twitter after click on icon
document.getElementById('twitter_icon').addEventListener('click', function() {
    window.open('https://twitter.com/', '_blank');
});
// Open telegram after click on icon
document.getElementById('youtube_icon').addEventListener('click', function() {
    window.open('https://www.youtube.com/', '_blank');
});
// Open telegram after click on icon
document.getElementById('instagram_icon').addEventListener('click', function() {
    window.open('https://www.instagram.com/', '_blank');
});

// Mobile-Nav home page 
document.getElementById('mobile-home').addEventListener('click', function() {
    displayHomePageButton();
});
// Mobile-Nav about page 
document.getElementById('mobile-about').addEventListener('click', function() {
    displayAboutPageButton();
});
// Mobile-Nav races page 
document.getElementById('mobile-races').addEventListener('click', function() {
    displayRacesPageButton();
});
// Mobile-Nav classes page 
document.getElementById('mobile-classes').addEventListener('click', function() {
    displayClassesPageButton();
});
// Mobile-Nav play page 
document.getElementById('mobile-play').addEventListener('click', function() {
    displayPlayPageButton();
});
// Mobile-Nav play page 
document.getElementById('mobile-Register').addEventListener('click', function() {
    window.location.href = 'Register.html';
});

// Display modal update
document.getElementById('userInfo').addEventListener('click', function() {
    $('#updateModal').modal('show');
});

// Load the values from global variable to update modal
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('updateEmail').value = sessionStorage.getItem("email");
    document.getElementById('updatePassword').value = sessionStorage.getItem("password");
    document.getElementById('updateUsername').value = sessionStorage.getItem("currentUser");
});

// Change map on play page
function changeName(e){
    var mapName = window.prompt("Please enter the map name", "");
    if (mapName !== null && mapName !== "") { // Check if the user entered a name and didn't just cancel the prompt
        document.getElementById('changeMapName').textContent ="Map name: " + mapName;
    }    
}
document.getElementById('changeMapName').addEventListener('click', changeName);


    //Setting messageUs_message color by the input
    const colorPicker = document.getElementById('messageColor');

    colorPicker.addEventListener('input', function() {
        document.documentElement.style.setProperty('--text-color', this.value);
    });


    // message us featuer (display the value of <input type="range">)
    var rangeInput = document.getElementById('messageUs_range');
    var rangeValueDisplay = document.getElementById('rangeValue');

    // Listen for input event on the range
    rangeInput.addEventListener('input', function() {
        // Update the span with the current value of the range
        if(rangeInput.value == "100"){
           rangeValueDisplay.textContent = "100+"; 
        } else {
            rangeValueDisplay.textContent = rangeInput.value;
        }
    });

    // Get the file input and the span elements
    var fileInput = document.getElementById('messageUs_file');
    var fileNameDisplay = document.getElementById('fileName');

    // Listen for change event on the file input
    fileInput.addEventListener('change', function() {
        var files = fileInput.files;
        if (files.length > 0) {
            // Update the span with the name of the first selected file
            fileNameDisplay.textContent = files[0].name;
        }
    });

document.getElementById('messageUs_form').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the values from your form inputs
    var email = document.getElementById('messageUs_email').value;
    var subject = document.getElementById('messageUs_subject').value;
    var message = document.getElementById('messageUs_message').value;
    var reason = document.getElementById('messageUs_select').value;
    var pass = document.getElementById('messageUs_password').value;
    var number = document.getElementById('messageUs_number').value;
    var times = document.getElementById('messageUs_range').value;
    var phone_number = document.getElementById('messageUs_phone_number').value;
    var datetime = document.getElementById('messageUs_datetime').value;
    var date_local = document.getElementById('messageUs_datetime-local').value;
    var the_date = document.getElementById('messageUs_date').value;
    var the_time = document.getElementById('messageUs_time').value;
    var our_website = document.getElementById('messageUs_copy_to').value;
    datetime = datetime.replace('T', ' ');
    date_local = date_local.replace('T', ' ');
    message = message + "\n\n" + "Reason: " + reason + "\npassword control: " + pass + "\nnumber control: " + number + '\n' + "Time encountered: " + times + "\n" + 
    "Phone number: " + phone_number + "\n" + "First time encountered: " + datetime + "\nlocal-date control(datetime, second time): " + date_local + "\ndate control: " + the_date + "\ntime control: " + the_time + "\n";
    if(our_website!=""){
        message = message + "Website: " + our_website + "\n\n";
    }
    else{
        message = message + "\n";
    }

    // Construct the mailto link
    var mailtoLink = 'mailto:' + email +
                     '&subject=' + encodeURIComponent(subject) +
                     '&body=' + encodeURIComponent(message);
    
    // Open the default mail client with the constructed mailto link
    window.location.href = mailtoLink;
});