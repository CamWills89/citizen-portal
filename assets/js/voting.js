//this JS file is for displaying election date and register to vote
let electionDayContainerEl = document.querySelector(".election-display");
let voterInfoEl = document.querySelector(".voter-info");
let addressEl = document.querySelector("#search");
let addressFormEl = document.querySelector("#address-form");
var websiteName = document.querySelector(".website-name");
var websiteAddress = document.querySelector(".website-link");
// console.log(addressEl);


//Google Calerndar API key = AIzaSyBWS5bz2ZlYk-Xj5qHqXGi_xy0sajaaaiU
//Google Calerndar CLIENT_ID = '996409993869-uormhtchi585ojoh31temputj9kn200f.apps.googleusercontent.com'

var userAddress =localStorage.getItem("address");

let electionDisplay = function (address) {
  let apiUrl =
    "https://civicinfo.googleapis.com/civicinfo/v2/elections?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        document.location.replace("./index.html");
      }
    })
    .then(function (data) {

      //this is to display all upcoming elections
      for (let i = 1; i < data.elections.length; i++) {
          var electionName = document.createElement("h2");
          electionName.textContent = data.elections[i].name;
          electionDayContainerEl.appendChild(electionName);
          var electionDate = moment(data.elections[i].electionDay).format(
            "dddd, MMMM, Do, YYYY");
            
            var electionDay = document.createElement("p");
            electionDay.textContent = electionDate;
            electionDayContainerEl.appendChild(electionDay);
      }
    
      //if we want to just display general election
      // electionNameEl.innerHTML = data.elections[3].name;
      // var electionDay = moment(data.elections[3].electionDay).format(
      //   "dddd, MMMM, Do, YYYY");
      // electionDayEl.innerHTML = electionDay;

      let voterApiUrl =
        "https://civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=" + userAddress + "&returnAllAvailableData=true&requestBody=true&electionId=5016&key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE";
      fetch(voterApiUrl)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            document.location.replace("./index.html");
          }
        })
        .then(function (data) {
          var siteName = data.state[0].electionAdministrationBody.name;
          var siteAddress =
            data.state[0].electionAdministrationBody.electionInfoUrl;
          //   console.log(data);

          websiteName.textContent =
            "Visit the " +
            siteName +
            " website to learn more details about upcoming elections relevant to you.";
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