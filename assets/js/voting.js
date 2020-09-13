//this JS file is for displaying election date and register to vote
let electionDayContainerEl = document.querySelector(".election-display");
let voterInfoEl = document.querySelector(".voter-info");
let websiteNameEl = document.querySelector(".website-name");
let websiteAddressElEl = document.querySelector(".website-link");
let newsModalEl = document.querySelector("#news-modal");
let newsModalContentEl = document.querySelector(".news");
let newsModalDeleteEl = document.querySelector("#news-modal-delete");
let modalHeading = document.querySelector(".modal-card-title");
// console.log(modalHeading);


let userAddress = localStorage.getItem("address");

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
        let electionName = document.createElement("h2");
        electionName.textContent = data.elections[i].name;
        electionDayContainerEl.appendChild(electionName);
        let electionDate = moment(data.elections[i].electionDay).format(
          "dddd, MMMM, Do, YYYY");

        let electionDay = document.createElement("p");
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
          let siteName = data.state[0].electionAdministrationBody.name;
          let siteAddress =
            data.state[0].electionAdministrationBody.electionInfoUrl;

          websiteNameEl.textContent =
            "Visit the " +
            siteName +
            " website to learn more details about upcoming elections relevant to you.";
          websiteAddressElEl.textContent = "Get More Information from the State's Webiste";
          websiteAddressElEl.setAttribute("href", siteAddress);
          websiteAddressElEl.setAttribute("target", "_blank");

          voterInfoEl.appendChild(websiteNameEl);
          voterInfoEl.appendChild(websiteAddressElEl);
        });
    });
};

let displayNewsHandler = function (event) {
  let targetedModal = event.target;
  if (event.target.matches("h2")) {
    newsModalEl.classList.add("is-active")
  }

  let electionName = targetedModal.textContent
  modalHeading.textContent = electionName;

  //get news articles with person's name
  let apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${electionName}&election&news_desk=politics&api-key=0LjGSIV1PXpRyRsQkYxlhQe10ryACGHV`

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      newsModalContentEl.textContent = "";

      //getting the 1st 5 articles and displaying them
      for (let i = 0; i < 5; i++) {
        let newsArticles = document.createElement("p");
        newsArticles.innerHTML = data.response.docs[i].headline.main;
        
        let articleUrl = document.createElement("a");
        let articleUrlLink = data.response.docs[i].web_url
        articleUrl.innerHTML = articleUrlLink;
        articleUrl.setAttribute("href", articleUrlLink);
        articleUrl.setAttribute("target", "_blank");

        newsModalContentEl.appendChild(newsArticles);
        newsModalContentEl.appendChild(articleUrl);
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