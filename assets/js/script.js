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

// $("#representative-btn").on("click", function () {
//     $("#rep-modal").addClass("is-active");
// });

// $("#repMod-delete").on("click", function () {
//     $("#rep-modal").removeClass("is-active")
// })

// $("#repMod-cancel").on("click", function () {
//     $("#rep-modal").removeClass("is-active")
// })

$("#representative-btn").on("click", function () {
    var userAddress = $("#repMod-input").val() //sessionStorage.getItem(key)
    console.log(userAddress)
    window.location = "candidates.html"

//starting here new page representatives.js. 
    //on representatives.html just scope dropdown (or buttons), then append info to page (using localStorage address in fetch call). 
    //make <li> clickable to pop up modal more info on person 
//     var scope = $("#scope").val()


//     let representativesApi = function () {
//         $("#repMod-result").text("")
//         let apiUrl =
//             `https://civicinfo.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE&levels=${scope}&address=${userAddress}`;

//         fetch(apiUrl)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 console.log(data);

//                 for (let i = 0; i < data.offices.length; i++) {
//                     officesIndex = data.offices[i]
//                     var officialsIndex = officesIndex.officialIndices
//                     // console.log(officesIndex.name + " " + officialsIndex + "name? ");

//                     var officeTitle = $("#repMod-result").append($("<p>").text(officesIndex.name))

//                     if (data.offices[i].officialIndices) {
//                         // console.log("2 or more");
//                         var indicesArr = data.offices[i].officialIndices
//                         for (let j = 0; j < indicesArr.length; j++) {

//                             console.log("hello");

//                             officeTitle.append($("<li>").text(data.officials[indicesArr[j]].name))

//                         }

//                     } 
                
//                 }


//             })

//     };
//     representativesApi()

});
//END representatives section

 
