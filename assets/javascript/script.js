var searchList = ["Superman",
"Batman",
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

function loadContent()
{
    searchList.forEach(function(search){
        $button = $("<button>");

        $button.attr("class","btn btn-primary m-2 btnCharacter");

        $button.text(search).val(search);         

        $("#buttonList").append($button);
    });
}

$(document).ready(function(){

    loadContent(); 


    $(".btnCharacter").on("click",function(){
    
        $(".searchResults").empty();

        let search = $(this).val();

        search = search.replace(" ","+");

        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${search}&limit=10&api_key=DguBVPmluFdrUwmm1gsbudlTW0BE9EM4`;
        

        $.ajax(queryURL).then(function(response){
            let results = response.data;
        

            for(let i = 0; i < results.length; i++){

                let divImage = $("<div>");

                divImage.attr("class","m-2 divCharacter");

                let image = $("<img>");  

                image.attr("class","imgCharacter");
                image.attr("data-state","still");
                image.attr("src",results[i].images.fixed_width_still.url);
                image.attr("data-still",results[i].images.fixed_width_still.url);
                image.attr("data-animate",results[i].images.fixed_width.url);  
                
                image.on("click",function(){

                    let state = $(this).attr("data-state");
            
                    if (state === "still")
                    {        
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    }
                    else if (state === "animate")
                    {       
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

                divImage.append(image);

                let rating = results[i].rating;
                rating = rating.toUpperCase();

                divImage.append($("<p>").text("Rating: " + rating));

                $(".searchResults").append(divImage);
                
            }
        });
    });
   

    $("#btnAdd").on("click",function(event){   

        event.preventDefault();
        
        alert("test");    

        let addCharacter = $("txtCharacter").val();

        console.log(addCharacter);

        $(".message").text();

        if(searchList.indexOf(addCharacter) < 0)
        {
            $("#buttonList").empty();
            
            searchList.push(addCharacter);

            loadContent();
        }
        else
        {
            $(".message").text(addCharacter + " is already in the list.");
        }

        
    });
});

