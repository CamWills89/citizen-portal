//javascript google map api
//claire's api key google civic AIzaSyBuB1fEZKUXfj7JWkm-7hKc8f6JS99iCPE
//cameron's google civic api AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE

let VotingSearchEl = document.querySelector("#voting-search");

$("#voting-search").on("click", function () {
    window.location = "voting.html"
});

   // Try HTML5 geolocation.
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,

        };
        console.log(pos)
    }) 
}


//REPRESENTATIVES section

$("#errorMod-delete").on("click", function () {
    $("#error-modal").removeClass("is-active")
})

$("#representative-btn").on("click", function () {
    var userAddress = $("#address").val() 
    console.log(userAddress)
    console.log("click!");
    
    if (userAddress==="" & !localStorage.getItem("address")){
        $("#error-modal").addClass("is-active")
    }
    else {
        localStorage.setItem("address", userAddress)
        window.location = "candidates.html"
    }

});


 
