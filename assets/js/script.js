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
            // console.log(response);
        })
        .then(function (data) {
            console.log(data);
        });
};

let voterInfoApi = function () {
    //this one isn't working, missing a "voter_key", which I think is an address, but it's not accepting any i put in
    let apiUrl =
        // "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE&address=8553%20N%20Capital%20Of%20Texas%20Hwy,%201107";
        "https://civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=8553%20N%20Capital%20Of%20Texas%20Hwy%2C%201107&returnAllAvailableData=true&requestBody=true&electionId=7000&key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE"
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
            // console.log(response);
        })
        .then(function (data) {
            console.log(data);
        });
};


//REPRESENTATIVES section

$("#representative-btn").on("click", function () {
    $("#rep-modal").addClass("is-active");
});

$("#repMod-delete").on("click", function () {
    $("#rep-modal").removeClass("is-active")
})

$("#repMod-cancel").on("click", function () {
    $("#rep-modal").removeClass("is-active")
})

$("#repMod-submit").on("click", function () {
    var userAddress = $("#repMod-input").val() //sessionStorage.getItem(key)
    console.log(userAddress)
    // window.location = "candidates.hmtl"


    var scope = $("#scope").val()


    let representativesApi = function () {
        $("#repMod-result").text("")
        let apiUrl =
            `https://civicinfo.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE&levels=${scope}&address=${userAddress}`;

        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);


                //doesn't work for state level because there are multiple indices arrays with an index of more than 1
                //look up for each function, indexOf

                for (let i = 0; i < data.offices.length; i++) {
                    officesIndex = data.offices[i]
                    var officialsIndex = officesIndex.officialIndices
                    // console.log(officesIndex.name + " " + officialsIndex + "name? ");

                    var officeTitle = $("#repMod-result").append($("<p>").text(officesIndex.name))

                    if (data.offices[i].officialIndices) {
                        // console.log("2 or more");
                        var indicesArr = data.offices[i].officialIndices
                        for (let j = 0; j < indicesArr.length; j++) {

                            console.log("hello");

                            officeTitle.append($("<li>").text(data.officials[indicesArr[j]].name))

                        }

                    } 
                    // else {
                    //     officeTitle.append($("<li>").text(data.officials[officialsIndex].name))
                    // }


                }

                //

                //for each official, if index is in data.offices[i].officialIndices, append official[i] to officeTitle, else return

                //         for (i = 0; i < data.offices.length; i++) {
                //             officesIndex = data.offices[i]
                //             var officialsIndex = officesIndex.officialIndices
                //             console.log(officesIndex.name + " " + officialsIndex);

                //             var officeTitle = $("#repMod-result").append($("<p>").text(officesIndex.name))
                //  var arr = data.officials
                //  arr.filter(function(i){
                //      if(officialsIndex.includes()){

                //      }
                //  })
                //   }

                // for (i = 0; i < data.officials.length; i++) {
                //     officeTitle.append($("<li>").text(data.officials[i].name))



                // if (officialsIndex.includes(data.officials.index)) {
                //     officeTitle.append($("<li>").text(data.officals[i].name))
                // } else {
                //     return
                // }
                // }




            })

    };
    representativesApi()

});







let ballotApi = function () {
    let apiUrl =
        "https://webservices.sos.state.tx.us/ballot-cert/report.aspx?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE&address=8553%20N%20Capital%20Of%20Texas%20Hwy,%201107";

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

var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
    });
    infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("You are here.");
            infoWindow.open(map);
            map.setCenter(pos);
        });
    }
}

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


// representativesApi();
// ballotApi();