//this JS file is for displaying election date and register to vote
let electionDayContainerEl = document.querySelector(".election-display");
let voterInfoEl = document.querySelector(".voter-info");
let websiteNameEl = document.querySelector(".website-name");
let websiteAddressElEl = document.querySelector(".website-link");
let modalEl = document.querySelector(".modal");
let newsModalEl = document.querySelector("#news-modal");
let newsModalContentEl = document.querySelector(".news");
let newsModalDeleteEl = document.querySelector("#news-modal-delete");
let modalHeading = document.querySelector(".modal-card-title");
// console.log(ModalEl);

//get the entered address and use
let userAddress = localStorage.getItem("address");

let electionDisplay = function () {
  let apiUrl =
    "https://civicinfo.googleapis.com/civicinfo/v2/elections?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        newsModalEl.classList.add("is-active")
        newsModalContentEl.textContent = ("There was an error connecting with the server")
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
        `https://civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=${userAddress}&returnAllAvailableData=true&requestBody=true&electionId=7000&key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE`;
      fetch(voterApiUrl)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            newsModalEl.classList.add("is-active")
            newsModalContentEl.textContent = ("There was an error connecting with the server")
          }
        })
        .then(function (data) {
          //get the name of the state and the state's website to display
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
        })
        .catch(function (error) {
          newsModalEl.classList.add("is-active")
          newsModalContentEl.textContent = ("There was an error connecting with the server")
        })
    });
};

let displayNewsHandler = function (event) {
  //display modal when an election is selected
  let targetedModal = event.target;
  if (targetedModal.matches("h2")) {
    newsModalEl.classList.add("is-active")
  } else {
    return;
  }

  let electionName = targetedModal.textContent
  modalHeading.textContent = electionName;

  //get news articles with person's name
  let apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${electionName}&election&sort=relevance&news_desk=politics&type_of_material=news&api-key=0LjGSIV1PXpRyRsQkYxlhQe10ryACGHV`

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        newsModalEl.classList.add("is-active")
        newsModalContentEl.textContent = ("There was an error connecting with the server")
      }
    })
    .then(function (data) {
      //first clear the old content
      newsModalContentEl.textContent = "";

      //getting the 1st 5 articles and displaying them
      for (let i = 0; i < 5; i++) {
        let newsArticles = document.createElement("p");
        newsArticles.classList.add("article-title");
        newsArticles.innerHTML = data.response.docs[i].headline.main;

        let articleUrl = document.createElement("a");
        let articleUrlLink = data.response.docs[i].web_url
        articleUrl.innerHTML = articleUrlLink;
        articleUrl.classList.add("article-link");
        articleUrl.setAttribute("href", articleUrlLink);
        articleUrl.setAttribute("target", "_blank");

        newsModalContentEl.appendChild(newsArticles);
        newsModalContentEl.appendChild(articleUrl);
      }
    })
    .catch(function (error) {
      newsModalEl.classList.add("is-active")
      newsModalContentEl.textContent = ("There was an error connecting with the server")
    })
}

//event listneners
document.addEventListener("click", displayNewsHandler);
//Remove modal on "x" 
newsModalDeleteEl.addEventListener("click", function (event) {
  newsModalEl.classList.remove("is-active")
});
//Remove modal on click outside of modal
modalEl.addEventListener("click", function (event) {
  if (event.target !== modalEl) {
    modalEl.classList.remove("is-active")
  }
})

electionDisplay();