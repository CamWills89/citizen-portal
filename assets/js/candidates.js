//This is the JS file for displaying the representatives



$("#country").on("click", function(){
    representativesApi()
})
var scope = $("#scope").val()


    let representativesApi = function () {
        $("#repMod-result").text("")
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
                    // console.log(officesIndex.name + " " + officialsIndex + "name? ");

                    var officeTitle = $("#repMod-result").append($("<p>").text(officesIndex.name))

                    if (data.offices[i].officialIndices) {
                        // console.log("2 or more");
                        var indicesArr = data.offices[i].officialIndices
                        for (let j = 0; j < indicesArr.length; j++) {

                            console.log("hello");

                            officeTitle.append($("<li>").text(data.officials[indicesArr[j]].name))

                        }

                    } 
                
                }


            })

    };
    

