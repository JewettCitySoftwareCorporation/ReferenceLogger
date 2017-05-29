$(document).ready(function () {

    $('.show-log').click(function (event) {
        event.preventDefault();
        $('.log').slideToggle();
    });

});


$.getScript("http://code.angularjs.org/1.1.0/angular.min.js", function () {

    alert("Angular Script loaded and executed.");

    // Use anything defined in the loaded script...
});