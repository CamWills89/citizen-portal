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
                        // console.log("2 or more");
                        var indicesArr = data.offices[i].officialIndices
                        for (let j = 0; j < indicesArr.length; j++) {
                            //set variables to add info to each li to extract when clicked
                            var party = data.officials[indicesArr[j]].party

                            var newLi = officeTitle.append($("<li>").text(data.officials[indicesArr[j]].name))
                            newLi.addClass(party)
                        }

                    } 
                
                }

            })
    };
    

//make li clickable
$(".result").on("click", "li", function(){
    console.log("clicky!");
    $(".modal-card-title").text($(this).text())
    $("#repMod-result").text($(this).attr("class"))
    $("#rep-modal").addClass("is-active")
})

$("#repMod-delete").on("click", function(){
    $("#rep-modal").removeClass("is-active")
})