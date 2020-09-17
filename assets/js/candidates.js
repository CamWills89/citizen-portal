//This is the JS file for displaying the representatives

//retrieve address user entered on homepage from local storage
var userAddress = localStorage.getItem("address");


//when any scope button is clicked, get its id and set to 'scope' variable. pass scope to api call
$(".scopeBtn").on("click", function () {
    var scope = $(this).attr("id");

    representativesApi(scope);
})

//api function call and result display
let representativesApi = function (scope) {
    //empty any text from previous call
    $(".result").text("");

    let apiUrl =
        `https://civicinfo.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE&levels=${scope}&address=${userAddress}`;

    fetch(apiUrl)
        .then(function (response) {
            //error handling
            if (!response.ok) {
                if (response.status <= 499) {
                    console.log(response.status);
                    $("#error-modal").addClass("is-active");
                    return;
                } else if (response.status >= 500) {
                    $("#error-modal").empty();
                    $("#error-modal").addClass("is-active").text("unable to connect to server");
                    return;
                }

            }
            return response.json();
        })
        .then(function (data) {

            //loop thru office titles
            for (let i = 0; i < data.offices.length; i++) {
                officesIndex = data.offices[i];
                var officialsIndex = officesIndex.officialIndices;
                //append each office title to page
                var repContainer = $("<div>").addClass("rep-container");
                $(".result").append(repContainer);
                $(repContainer).append($("<p>").text(officesIndex.name));


                var indicesArr = data.offices[i].officialIndices;
                //loop thru all representatives holding the office title
                for (let j = 0; j < indicesArr.length; j++) {

                    var rep = data.officials[indicesArr[j]];

                    //if name is VACANT, don't attach any info
                    if (rep.name == "VACANT") {
                        var vacantLi = $("<li>").text(rep.name).addClass("vacant-li");
                        repContainer.append(vacantLi);
                    } else {
                        //create new li element for each representative. found by plugging in correspoding index to officials array
                        var repLi = $("<li>").text(rep.name).addClass("rep-li");

                        //set variables to add info to each li to extract later when clicked
                        var party = rep.party;
                        var phone = rep.phones;
                        var website = rep.urls;

                        //append attributes to new li
                        repLi.attr("data-party", party);
                        repLi.attr("data-phone", phone);
                        repLi.attr("data-website", website);

                        //loop thru 'channels' array (if there is one) to get first 2 socials
                        var socials = rep.channels;

                        if (socials) {
                            var socialNum = 1
                            for (k = 0; k < socials.length; k++) {

                                var socialType = socials[k].type;
                                var socialID = socials[k].id;

                                //append to new li
                                repLi.attr("data-socialType-" + socialNum, socialType);
                                repLi.attr("data-socialID-" + socialNum, socialID);

                                socialNum++;
                            }
                        }
                        //append new li to corresponding container
                        repContainer.append(repLi);
                    }
                }
            }

        })
};


//make representative li clickable

$(".result").on("click", "li", function () {

    //extract data attributes and append to modal

    //title
    $(".modal-card-title").text($(this).text());

    //party
    $("#party").empty();
    $("#party").text("Party: " + $(this).attr("data-party"));

    //website
    $("#website").empty();
    var url = $(this).attr("data-website");
    if (url) {
        $("#website").append($("<a>").attr("href", url).text("Website: " + url));
    }

    //phone
    $("#phone").empty();
    $("#phone").text($(this).attr("data-phone"));

    //socials
    $("#socialOne").text("");
    $("#socialTwo").text("");
    //extract socials data attributes if they exist, append to modal
    if ($(this).attr("data-socialType-1")) {
        $("#socialOne").text($(this).attr("data-socialType-1") + ": " + $(this).attr("data-socialID-1"));
    }
    if ($(this).attr("data-socialType-2")) {
        $("#socialTwo").text($(this).attr("data-socialType-2") + ": " + $(this).attr("data-socialID-2"));
    }

    //create name variable to pass to getNews function
    var name = $(this).text().split(" ").join("-");

    getNews(name);

    //trigger modal
    $("#rep-modal").addClass("is-active");

})



//get news articles with person's name

var getNews = function (name) {

    var apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${name}&election&sort=relevance&news_desk=politics&type_of_material=news&api-key=0LjGSIV1PXpRyRsQkYxlhQe10ryACGHV`;

    fetch(apiUrl)
        .then(function (response) {
            //error handling
            if (!response.ok) {
                if (response.status <= 499) {
                    console.log(response.status);
                    $("#error-modal").addClass("is-active");
                    return;
                } else if (response.status >= 500) {
                    $("#error-modal").empty();
                    $("#error-modal").addClass("is-active").text("unable to connect to server");
                    return;
                }

            }
            return response.json();
        })
        .then(function (data) {

            $(".articles").empty();

            for (i = 0; i < data.response.docs.length; i++) {
                var newP = $("<p>");
                var nameSplit = name.split("-");
                var firstName = nameSplit[0];
                var lastName = nameSplit[nameSplit.length - 1];

                var headline = data.response.docs[i].headline.main;

                if (headline.includes(firstName) && headline.includes(lastName)) {

                    var articleUrl = data.response.docs[i].web_url;
                    newP.append($("<a>").attr("href", articleUrl).attr("target", "_blank").text(headline).addClass("article-link"));
                    newP.addClass("article-title");

                    $(".articles").append(newP);
                }
            }
        })
}

//bulma-related click functions

//make x button on modal exit out of modal
$(".delete").on("click", function () {
    $(".modal").removeClass("is-active");
})

//toggling the hamburger menu
$(document).ready(function () {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
});