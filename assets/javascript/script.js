var searchList = ["Superman ",
"Batman ",
"Spider-Man",
"Green Lantern",
"Thor",
"Captain America",
"Wonder Woman",
"Flash ",
"Hulk",
"Wolverine",
"Supergirl",
"Robin ",
"Aquaman",
"Black Panther",
"Jean Grey",
"Cyclops",
"Rogue",
"Leonardo",
"Donatello",
"Michelangelo",
"Raphael",
"Professor X",
"Doctor Strange"
];

$(document).ready(function(){
    searchList.forEach(function(search){
        $button = $("<button>");

        $button.attr("class","btn btn-primary m-2");

        $button.text(search).val(search);        

        $button.on("click",function(){
            let search = $(this).val();

            let queryURL = 'https://api.giphy.com/v1/gifs/search?q=${search}&limit=10&api_key=DguBVPmluFdrUwmm1gsbudlTW0BE9EM4'

            $.ajax(queryURL).then(function(response){
                let results = response.data;

                for(let i = 0; i < results.length; i++){
                    let image = $("<img>");

                    image.attr("data-state","still");
                    image.attr("src",results[i].images.fixed_width_small_still);
                    image.attr("data-still",results[i].images.fixed_width_small_still);
                    image.attr("data-animate",results[i].images.fixed_width_small);
                }
            });
        });

        $("#buttonList").append($button);
    });

    $(".btnAdd").on("click",function(event){
        event.preventDefault();

        let search = $("txtCharacter").val();

        
    });
});

