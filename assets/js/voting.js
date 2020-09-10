//this JS file is for displaying election date and register to vote
let electionNameEl = document.querySelector(".election-name");
let electionDayEl = document.querySelector(".election-day");
let voterInfoEl = document.querySelector(".voter-info");

// console.log(voterInfoEl);

// let selectElection = function() {
//   let apiUrl =
//     "https://civicinfo.googleapis.com/civicinfo/v2/elections?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE";

//   fetch(apiUrl)
//     .then(function (response) {
//       return response.json();
//       // console.log(response);
//     })
//     .then(function (data) {
//       console.log(data);
//       var electionEL = document.getElementById('election')
//       // console.log(election);
      
//       for (var i = 1; i < data.elections.length; i++) {
        
//         console.log(data.elections[i].id);
//         console.log();
//         var electionOption = document.createElement("option");
//         electionOption.setAttribute("value", data.elections[i].id)
//         electionOption.textContent = data.elections[i].name
//         electionEL.appendChild(electionOption)
//       }
//     });
// };

let electionDisplay = function () {
  let apiUrl =
    "https://civicinfo.googleapis.com/civicinfo/v2/elections?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
      // console.log(response);
    })
    .then(function (data) {
      var electionEL = document.getElementById('election')
      // console.log(election);
      
      for (var i = 1; i < data.elections.length; i++) {
        
        console.log(data.elections[i].id);
        console.log();
        var electionOption = document.createElement("option");
        electionOption.setAttribute("value", data.elections[i].id)
        electionOption.textContent = data.elections[i].name
        electionEL.appendChild(electionOption)
      }
      
      console.log(data);

      electionNameEl.innerHTML = data.elections[3].name;
      var electionDay = moment(data.elections[3].electionDay).format(
        "dddd, MMMM, Do, YYYY");
      electionDayEl.innerHTML = electionDay;

      let voterApiUrl =
        "https://civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=8553%20N%20Capital%20Of%20Texas%20Hwy%2C%201107&returnAllAvailableData=true&requestBody=true&electionId=7000&key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE";
      fetch(voterApiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var siteName = data.state[0].electionAdministrationBody.name;
          var siteAddress =
            data.state[0].electionAdministrationBody.electionInfoUrl;
          //   console.log(data);

          var websiteName = document.createElement("h3");
          var websiteAddress = document.createElement("a");

          websiteName.textContent =
            "Visit the " +
            siteName +
            " website to learn about more election details";
          websiteAddress.textContent = "Click Here to go to the Website";
          websiteAddress.setAttribute("href", siteAddress);
          websiteAddress.setAttribute("target", "_blank");

          voterInfoEl.appendChild(websiteName);
          voterInfoEl.appendChild(websiteAddress);

          console.log(data);
        });
    });
};

electionDisplay();
// selectElection();