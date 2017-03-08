$(function(){

    $('.nyt-categories').change( '.categories option:selected', function(event){ //When selec option is changed, this runs
        event.preventDefault();
        $('.newsFlex').empty(); //Empties the UL of all articles, everytime selection is changed

        $('.loaderGif img').show();  //Displays the ajax loader

        const chosenCategory = $('.categories option:selected').val(); 

        //NYT AJAX CALL
         let url = 'https://api.nytimes.com/svc/topstories/v2/' + chosenCategory + '.json?api-key=da52f7a32bda4e16bac25f88e3162265'
        $.ajax({
            method : 'GET',
            url : url
        })
        .done(function(data){
            let articlesResults = data.results
            let listAppendage = '';

            let filteredArticles = articlesResults.filter(function(value){
                return value.multimedia.length > 0;
            }).slice(0,12);

            $.each(filteredArticles,(key, value) => {
                let image = value.multimedia[4].url;
                let articleText = value.abstract;
                let articleLink = value.url;
            
                //This area creates a long string, of the list items to be appended on the UL
                listAppendage += '<li>'; 
                listAppendage += '<a href="' + articleLink + '">';
                listAppendage += '<div class="articleImg" style="background-image:url(' + image + ')"></div>';
                listAppendage += '<p>' + articleText + '</p>';
                listAppendage += '</a></li>';
            })

            $('.newsFlex').append(listAppendage);
        })
        .fail(function(){ //Code to run when no data is recieved from NYT
            $('.newsFlex').append('<li> Error Retrieving data from NYT.. </li>') 
        })
        .always(function(){ //This code runs, whether or not the NYT ajax call worked.
            $('.loaderGif img').hide();

            $('header').addClass('animateHead');
        })
    }).selectric();
})