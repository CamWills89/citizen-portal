//This is the JS file for displaying the representatives
var userAddress =localStorage.getItem("address")

$(".scopeBtn").on("click", function(){
    var scope = $(this).attr("id")
    console.log(scope);
    console.log("click!");
    
    representativesApi(scope)
})

//api function call and result display
    let representativesApi = function (scope) {

        $(".result").text("")

        let apiUrl =
            `https://civicinfo.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCaQylnKFXTaeh7o8Vuenj8LKnFkcr6nQE&levels=${scope}&address=${userAddress}`;

        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                for (let i = 0; i < data.offices.length; i++) {
                    officesIndex = data.offices[i]
                    var officialsIndex = officesIndex.officialIndices
                   
                    var officeTitle = $(".result").append($("<p>").text(officesIndex.name))

                    if (data.offices[i].officialIndices) {
                        
                        var indicesArr = data.offices[i].officialIndices
                        for (let j = 0; j < indicesArr.length; j++) {
                            //set variables to add info to each li to extract when clicked
                            var party = data.officials[indicesArr[j]].party
                            var phone = data.officials[indicesArr[j]].phones
                            var website = data.officials[indicesArr[j]].urls
                            //add twitter
                            //create new element
                            var newLi = $("<li>").text(data.officials[indicesArr[j]].name)
                            //append all attributes to new li
                            newLi.attr("data-party",party)
                            newLi.attr("data-phone", phone)
                            newLi.attr("data-website", website)
                            //append new li to corresponding office title
                            officeTitle.append(newLi)
                        
                            
                        }

                    } 
                
                }

            })
    };
    

//make li clickable
$(".result").on("click", "li", function(){
    //extract data attributes and append 
    $(".modal-card-title").text($(this).text())
    $("#party").text($(this).attr("data-party"))
    $("#website").text($(this).attr("data-website"))
    $("#phone").text($(this).attr("data-phone"))
    //add twitter
    //trigger modal
    $("#rep-modal").addClass("is-active")
})

$("#repMod-delete").on("click", function(){
    $("#rep-modal").removeClass("is-active")
})