//javascript google map api
//claire's api key google civic AIzaSyBuB1fEZKUXfj7JWkm-7hKc8f6JS99iCPE
//cameron's google civic api AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE

//THINGS TO FIX
//error modal text color change

//REPRESENTATIVES section

$("#errorMod-delete").on("click", function () {
    $("#error-modal").removeClass("is-active");
});

//Local storage for representatives button
$("#representative-btn").on("click", function () {
    var userAddress = $("#address").val();

    if (userAddress === "" & !localStorage.getItem("address")) {
        $("#error-modal").addClass("is-active");
    } else if (localStorage.getItem("address") && userAddress == "") {
        $("#address").val(localStorage.getItem("address"));
        window.location = "candidates.html";
    } else {
        localStorage.setItem("address", userAddress);
        window.location = "candidates.html";
    }

});

//Local storage for voter info button
$("#voting-search").on("click", function () {
    var userAddress = $("#address").val();

    if (userAddress === "" & !localStorage.getItem("address")) {
        $("#error-modal").addClass("is-active");
    } else if (localStorage.getItem("address") && userAddress == "") {
        $("#address").val(localStorage.getItem("address"));
        window.location = "voting.html";
    } else {
        localStorage.setItem("address", userAddress);
        window.location = "voting.html";
    }
});

//toggling the hamburger menu
$(document).ready(function () {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
});