$(function(){


    $('#categories').change( '#categories option:selected', function(event){
        event.preventDefault();
        $('#newsFlex').empty();

        $('#loaderGif img').show();

        var chosenCategory = $('#categories option:selected').text().toLowerCase(); 

         var url = 'https://api.nytimes.com/svc/topstories/v2/' + chosenCategory + '.json?api-key=da52f7a32bda4e16bac25f88e3162265'
        $.ajax({
            method : 'GET',
            url : url
        })
        .done(function(data){
            var articlesResults = data.results
            var listAppendage = '';

            var filteredArticles = articlesResults.filter(function(value){
                return value.multimedia.length > 0;
            }).slice(0,12);

            $.each(filteredArticles, function(key, value){
                var image = value.multimedia[4].url;
                var articleText = value.abstract;
                var articleLink = value.url;
            
                listAppendage += '<li>'; 
                listAppendage += '<a href="' + articleLink + '">';
                listAppendage += '<div class="articleImg" style="background-image:url(' + image + ')"></div>';
                listAppendage += '<p>' + articleText + '</p>';
                listAppendage += '</a></li>';
            })

            $('#newsFlex').append(listAppendage);
        })
        .fail(function(){
            $('#newsFlex').append('<li> Error Retrieving data from NYT.. </li>')
            $('#loaderGif img').hide();
        })
        .always(function(){

            $(document).ajaxComplete(function(){
                $('#loaderGif img').hide();
            });

            $('header').addClass('animateHead');
        })
    })
})