//This is the JS file for displaying the representatives

//retrieve address user entered on homepage from local storage
var userAddress = localStorage.getItem("address")


//when any scope button is clicked, get its id and set to 'scope' variable. pass scope to api call
$(".scopeBtn").on("click", function () {
    var scope = $(this).attr("id")

    representativesApi(scope)
})

//api function call and result display
let representativesApi = function (scope) {
    //empty any text from previous call
    $(".result").text("")

    let apiUrl =
        `https://civicinfo.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE&levels=${scope}&address=${userAddress}`;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //loop thru office titles
            for (let i = 0; i < data.offices.length; i++) {
                officesIndex = data.offices[i]
                var officialsIndex = officesIndex.officialIndices
                //append each office title to page
                var repContainer = $("<div>")
                $(".result").append(repContainer)
                var officeTitle = $(repContainer).append($("<p>").text(officesIndex.name))
                
                if (data.offices[i].officialIndices) {
                   
                    var indicesArr = data.offices[i].officialIndices
                    //loop thru all representatives holding the office title
                    for (let j = 0; j < indicesArr.length; j++) {

                        //create new li element for each representative. found by plugging in correspoding index to officials array
                        var newLi = $("<li>").text(data.officials[indicesArr[j]].name)

                        //set variables to add info to each li to extract later when clicked
                        var party = data.officials[indicesArr[j]].party
                        var phone = data.officials[indicesArr[j]].phones
                        var website = data.officials[indicesArr[j]].urls

                        //append attributes to new li
                        newLi.attr("data-party", party)

                        newLi.attr("data-phone", phone)

                        newLi.attr("data-website", website)

                        //loop thru 'channels' array (if there is one) to get first 2 socials
                        if (data.officials[indicesArr[j]].channels) {
                            var socialNum = 1
                            for (k = 0; k < data.officials[indicesArr[j]].channels.length; k++) {

                                var socialType = data.officials[indicesArr[j]].channels[k].type
                                var socialID = data.officials[indicesArr[j]].channels[k].id
                                // console.log("social " + data.officials[indicesArr[j]].name + " " + socialType + " " + socialID);

                                //append to new li
                                newLi.attr("data-socialType-" + socialNum, socialType)
                                newLi.attr("data-socialID-" + socialNum, socialID)

                                socialNum++
                            }
                        }
                        

                        //append new li to corresponding office title
                        repContainer.append(newLi)

                        
                    }

                }

            }

        })
};


//make representative li clickable
$(".result").on("click", "li", function () {

    //extract data attributes and append to modal
    $(".modal-card-title").text($(this).text())

    $("#party").empty()
    $("#party").text("Party: " + $(this).attr("data-party"))

    //empty website p
    $("#website").empty()

    var url = $(this).attr("data-website")
    if (url) {
        $("#website").append($("<a>").attr("href", url).text("Website: " + url))
    }

    $("#phone").text($(this).attr("data-phone"))

    //empty socials p's 
    $("#socialOne").text("")
    $("#socialTwo").text("")

    //extract socials data attributes if they exist, append to modal
    if ($(this).attr("data-socialType-1")) {
        $("#socialOne").text($(this).attr("data-socialType-1") + ": " + $(this).attr("data-socialID-1"))
    }
    if ($(this).attr("data-socialType-2")) {
        $("#socialTwo").text($(this).attr("data-socialType-2") + ": " + $(this).attr("data-socialID-2"))
    }

    var name = $(this).text().split(" ").join("-")
    console.log("LOOK " + name);


    //get news articles with person's name
    var apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${name}&election&sort=relevance&news_desk=politics&type_of_material=news&api-key=0LjGSIV1PXpRyRsQkYxlhQe10ryACGHV`

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            $(".articles").empty()

            for (i = 0; i < data.response.docs.length; i++) {
                var newP = $("<p>")
                var nameSplit = name.split("-")
                var firstName = nameSplit[0]
                var lastName = nameSplit[nameSplit.length - 1]

                if (data.response.docs[i].headline.main.includes(firstName) && data.response.docs[i].headline.main.includes(lastName)) {
                    newP.text(data.response.docs[i].headline.main)
                    var articleUrl = data.response.docs[i].web_url
                    newP.append($("<a>").attr("href", articleUrl).attr("target", "_blank").text(articleUrl).addClass("article-link"))
                    newP.addClass("article-title")

                    $(".articles").append(newP)

                }
            }


            //if there are no p's in .articles div, say "there's nothing"
            //     $(this).append($("<p>").text("no articles at this time"))
            //     console.log("HERE");
            // }


            //trigger modal
            $("#rep-modal").addClass("is-active")
        })
})

//make x button on modal exit out of modal
$("#repMod-delete").on("click", function () {
    $("#rep-modal").removeClass("is-active")
})

