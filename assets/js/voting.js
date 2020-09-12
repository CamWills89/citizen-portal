//this JS file is for displaying election date and register to vote
let electionDayContainerEl = document.querySelector(".election-display");
let voterInfoEl = document.querySelector(".voter-info");
let addressEl = document.querySelector("#search");
let addressFormEl = document.querySelector("#address-form");
var websiteName = document.querySelector(".website-name");
var websiteAddress = document.querySelector(".website-link");
// console.log(addressEl);



//Google Calerndar API key = AIzaSyAME33CAQSclCkMcwJOAn37HGRWJGQcxnI
//Google Calerndar CLIENT_ID = 996409993869-ub7ooogb127g6ccliu0j5dlbuc6i9uqa.apps.googleusercontent.com
//Google Calendar Client secret = cB36z4BGDq-_U6iqnF_jkKEn
//Google Calendar refresh token = 1//04TDl8rE0PMKdCgYIARAAGAQSNwF-L9Ire06yCNR9SjKuYfRrxpVaiTimXdmAN7dDtuBfD9caTulawFVTvFYy5XmwIGBfYs0a_Ks
//Google Calendar private key = voting-app-289001-a1e8ebd1d2a0.json 
//Google Calendar project number = 996409993869

// Google api console clientID and apiKey 

// var clientId = '115714478106130543821.apps.googleuserecontent.com';
// var apiKey = 'AIzaSyAME33CAQSclCkMcwJOAn37HGRWJGQcxnI';

// // enter the scope of current project (this API must be turned on in the Google console)
// var scopes = 'https://www.googleapis.com/auth/calendar'
//  "https://www.googleapis.com/auth/calendar.events"


var myKey = 'AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE'; // typically like Gtg-rtZdsreUr_fLfhgPfgff
  var clientId = "d1be1nro15qcja1psp9fd1pdck@group.calendar.google.com"


var calendarApi = function () { 
  
  var apiUrl ='https://www.googleapis.com/auth/calendar' + clientId+ '/events?key=' + myKey
  fetch(apiUrl).then(function (response) {
    return response.json();
    }).then(function (data) {
      console.log(data);
    })
 };

 calendarApi();

 
var userAddress = localStorage.getItem("address");

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
        "https://civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=" + userAddress + "&returnAllAvailableData=true&requestBody=true&electionId=7000&key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE";
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