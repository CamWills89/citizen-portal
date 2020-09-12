//this JS file is for displaying election date and register to vote
let electionDayContainerEl = document.querySelector(".election-display");
let voterInfoEl = document.querySelector(".voter-info");
var websiteName = document.querySelector(".website-name");
var websiteAddress = document.querySelector(".website-link");
var newsModalEl = document.querySelector("#news-modal");
var newsModalDeleteEl = document.querySelector("#news-modal-delete");
var modalHeading = document.querySelector(".modal-card-title");
// console.log(modalHeading);


var userAddress = localStorage.getItem("address");

let electionDisplay = function () {
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
          websiteAddress.textContent = "Get More Information from the State's Webiste";
          websiteAddress.setAttribute("href", siteAddress);
          websiteAddress.setAttribute("target", "_blank");

          voterInfoEl.appendChild(websiteName);
          voterInfoEl.appendChild(websiteAddress);

          // console.log(data);

        });
    });
};

let displayNewsHandler = function (event) {
  var modalTarget = event.target;
  if (event.target.matches("h2")) {
    newsModalEl.classList.add("is-active")
  }

  var electionName = modalTarget.textContent
  modalHeading.textContent = electionName;

  //get news articles with person's name
  var apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${electionName}&election&news_desk=politics&api-key=0LjGSIV1PXpRyRsQkYxlhQe10ryACGHV`

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      $(".news").empty()

      for (let i = 0; i < 5; i++) {
        let newP = $("<p>")
        newP.text(data.response.docs[i].headline.main)
        let articleUrl = data.response.docs[i].web_url
        newP.append($("<a>").attr("href", articleUrl).attr("target", "_blank").text(articleUrl))

        $(".news").append(newP)
      }
    });
}

//event listneners
document.addEventListener("click", displayNewsHandler);
//Remove modal
newsModalDeleteEl.addEventListener("click", function (event) {
  newsModalEl.classList.remove("is-active")
});

electionDisplay();