//this JS file is for displaying election date and register to vote
let electionNameEl = document.querySelector(".election-name");
let electionDayEl = document.querySelector(".election-day");
let voterInfoEl = document.querySelector(".voter-info");

// console.log(voterInfoEl);

let electionsApi = function () {
    let apiUrl =
      "https://civicinfo.googleapis.com/civicinfo/v2/elections?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE";
  
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
        // console.log(response);
      })
      .then(function (data) {
          electionNameEl.innerHTML = data.elections[3].name
          var electionDay = moment(data.elections[3].electionDay).format("dddd, MMMM, Do, YYYY");
          electionDayEl.innerHTML = electionDay
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
       var siteName = data.state[0].electionAdministrationBody.name;
        var websiteName = document.createElement("h3");
        websiteName.textContent = ("Visit the " + siteName + " website to learn about more election details");
        voterInfoEl.appendChild(websiteName);
       
       console.log(data);
      });
  };

  electionsApi();
  voterInfoApi();