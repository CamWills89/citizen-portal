//javascript google map api
//claire's api key google civic AIzaSyBuB1fEZKUXfj7JWkm-7hKc8f6JS99iCPE
//cameron's google civic api AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE

let VotingSearchEl = document.querySelector("#voting-search");

$("#voting-search").on("click", function () {
  $(".modal").addClass("is-active");
});

let electionsApi = function () {
  let apiUrl =
    "https://civicinfo.googleapis.com/civicinfo/v2/elections?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
      console.log(response);
    })
    .then(function (data) {
      console.log(data);
    });
};

let voterInfoApi = function () {
  //this one isn't working, missing a "voter_key", which I think is an address, but it's not accepting any i put in
  let apiUrl =
    "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE&address=8553%20N%20Capital%20Of%20Texas%20Hwy,%201107";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
      console.log(response);
    })
    .then(function (data) {
      console.log(data);
    });
};

let representativesApi = function () {
  let apiUrl =
    "https://civicinfo.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE&address=8553%20N%20Capital%20Of%20Texas%20Hwy,%201107";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
      console.log(response);
    })
    .then(function (data) {
      console.log(data);
    });
};

//geolocation map from google api

// var map, infoWindow;
// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//   });
//   infoWindow = new google.maps.InfoWindow();

//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent("You are here.");
//       infoWindow.open(map);
//       map.setCenter(pos);
//     });
//   }
// }

//error handling
//  else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }


// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }

electionsApi();
// voterInfoApi();
representativesApi();
