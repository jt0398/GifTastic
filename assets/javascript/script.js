//List of superheroes
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
    //Creates a button for each superhero name in the list
    searchList.forEach(function(search){
        $button = $("<button>");

        $button.attr("class","btn btn-success m-2 btnCharacter");

        $button.text(search).val(search);         

        $("#buttonList").append($button);
    });

    //When a specific superhero button is clicked
    $(".btnCharacter").on("click",function(){
    
        //Clears out the search result area
        $(".searchResults").empty();

        //Get the superhero from the button text
        let search = $(this).val();

        //Replaces space in the superhero name with a plus sign
        search = search.replace(" ","+");

        /* Builds the Giphy API URL 
            Parameters passed are the superhero name, number of images returned which is 10 and API Key
        */
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${search}&limit=10&api_key=DguBVPmluFdrUwmm1gsbudlTW0BE9EM4`;
        

        //AJAX call is executed
        $.ajax(queryURL).then(function(response){
            let results = response.data;
        
            //For each gif image returned, create an image element
            for(let i = 0; i < results.length; i++){

                let divImage = $("<div>");

                //Organizes 4 image elements per row
                if (i % 4 == 0 && i > 0)
                {
                    $(".searchResults").append("<div class='clearfix'>&nbsp;</div>");
                }              

                divImage.attr("class","m-2 divCharacter float-left");

                //Creates an image element
                let image = $("<img>");  

                image.attr("class","imgCharacter"); //set CSS style
                image.attr("data-state","still"); //set data-state attribute
                image.attr("src",results[i].images.fixed_width_still.url); //set initial src attribute
                image.attr("data-still",results[i].images.fixed_width_still.url); //set data-still attribute with the gif still URL
                image.attr("data-animate",results[i].images.fixed_width.url);  //set data-animate attribute with the gif default URL
                
                //When the image is clicked, the src attribute value changes between the still and animated image URL
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

                //Image element is appended to a div element
                divImage.append(image);

                //Get rating of the image
                let rating = results[i].rating;
                rating = rating.toUpperCase();

                //Appends a p tag element to the div element
                divImage.append($("<p>").text("Rating: " + rating));

                //Appends div element to result
                $(".searchResults").append(divImage);
                
            }
        });
    });
}

//On page load
$(document).ready(function(){

    //Creates a button for each superhero name in the list and assign event handler for the button
    loadContent();   
   
    //Assigns callback function to the click event of the Add button
    $("#btnAdd").on("click",function(event){   

        //Prevents the form from being sent to the server
        event.preventDefault();     

        let addCharacter = $("#txtCharacter").val().trim();        

        $(".message").text("");

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

