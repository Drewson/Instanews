$(function(){

     var chosenCategory = $('#categories option:selected').text(); 

    $('#categories').change( '#categories option:selected', function(event){
        event.preventDefault();
        $('#newsFlex').empty();

        var chosenCategory = $('#categories option:selected').text().toLowerCase(); 

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

                listAppendage += '<li class="imageList"><p>';
                listAppendage += articleText + '</p><div class="bkg"></li>';
                listAppendage += '</div>';
                $('.bkg').css('background-image', 'url(' + image + ')');//stlye tag alink
            })

            $('#newsFlex').append(listAppendage);
        })
        .fail(function(){
            
        })
        .always(function(){
            $('header').addClass('animateHead');
        })
    })
})