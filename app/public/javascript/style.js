
$(document).ready(function() {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal",
    mouseWheelPixels: 120 //change this to a value, that fits your needs
  });
  $(".scrollYes---").mCustomScrollbar({
    theme: "dark",
    mouseWheelPixels: 120 //change this to a value, that fits your needs
  });

  $('#dismiss, .overlay').on('click', function() {
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
  });

  $('#sidebarCollapse').on('click', function() {
    $('#sidebar').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
});
