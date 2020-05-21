var women = ["Beyonce", "Michelle Obama", "Rihanna", "Alexandria Ocasio-Cortez"];
function renderButtons() {
    $('#display-buttons').empty();
    for (var i = 0; i < women.length; i++) {
        
        var w = $("<button>");

        w.addClass("women");

        w.attr("data-name", women[i]);

        w.text(women[i]);

        $("#display-buttons").append(w);
    }
}

$("#add-woman").on("click", function() {
    var input = $("#woman-input").val().trim();
        if(input === "") {
            alert("add a woman please!");
            console.log("add her button was pushed!");
        }
    
})

$("#add-woman").on("click", function(event) {

    event.preventDefault();
    var powerful = $("#woman-input").val().trim();
    women.push(powerful);

    renderButtons(powerful);
});
renderButtons();

$(document).on("click",".women", function(data) {
    console.log(data)
    var women = $(this).attr("data-name");
    console.log(women)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        women + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function(response) {
        
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                var gif = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var image = $("<img>");

                image.attr("src", results[i].images.fixed_height.url);
                // console.log(powerful)
                console.log(women)
                if (women === ""){
                    image.attr("data-name", powerful)
                } else {
                    image.attr("data-name", women)
                }

                gif.append(p);
                gif.append(image);

                $("#gifsappear").prepend(gif);
            }
        }
    })
})
