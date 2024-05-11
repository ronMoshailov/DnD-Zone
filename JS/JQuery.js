// Draggable function
$( function() {
    $( ".draggable" ).draggable();
  } );

// Move burger
$(document).ready(function() {
    $(".hamburger-menu input").change(function() {
        var hamburgerMenu = $(this).closest('.hamburger-menu');
        
        // Check the checked state of the checkbox
        if ($(this).prop('checked')) {
            // If checked, change position to fixed and add blur effect to the content wrapper
            hamburgerMenu.css('position', 'fixed');
            // $('.stylePage').addClass('blur-effect');
        } else {
            // If not checked, change position to relative and remove the blur effect
            hamburgerMenu.css('position', 'relative');
            // $('.stylePage').removeClass('blur-effect');
        }
    });
});