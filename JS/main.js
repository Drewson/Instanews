$(function(){

     var chosenCategory = $('#categories option:selected').text(); 

    $('#categories').change( '#categories option:selected', function(event){
        event.preventDefault();
        $('#newsFlex').empty();

        $('#loaderGif img').show();

        chosenCategory = $('#categories option:selected').text().toLowerCase(); 

        var url = 'https://api.nytimes.com/svc/topstories/v2/' + chosenCategory + '.json';
        url += '?' + $.param({'api-key': 'da52f7a32bda4e16bac25f88e3162265'});

        $.ajax({
            method : 'GET',
            url : url
        })
        .done(function(data){
            var resultsArray = data.results
            var listAppendage = '';

            var filteredArray = resultsArray.filter(function(value){
                return value.multimedia.length > 0;
            }).slice(0,12);

            $.each(filteredArray, function(key, value){
                var image = value.multimedia[4].url;
                var articleText = value.abstract;
                var articleLink = value.url;
            
                listAppendage += '<li class="imageList">'; 
                listAppendage += '<a href="' + articleLink + '"><div class="articleImg"'
                listAppendage +=  'style="background-image:url(' + image + ')"></div>';
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