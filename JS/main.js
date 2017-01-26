$(function(){

     var chosenCategory = $('#categories option:selected').text(); 
        console.log(chosenCategory)

    $('#categories').change( '#categories option:selected', function(event){
        event.preventDefault();
        $('#newsFlex').empty();

        var chosenCategory = $('#categories option:selected').text().toLowerCase(); 
        console.log(chosenCategory)

        var url = 'https://api.nytimes.com/svc/topstories/v2/' + chosenCategory + '.json';
        url += '?' + $.param({'api-key': 'da52f7a32bda4e16bac25f88e3162265'});

        $.ajax({
            method : 'GET',
            url : url
        })
        .done(function(data){
            console.log(data);
            var array = data.results

            $.each(array, function(){
                
                if(this.multimedia.length !== 0 ) {
                        
                    var image = this.multimedia[3].url;

                    $('#newsFlex').append('<li>' + '<img src="' + image + '">' + '</li>')

                } else {
                    return true;
                }
            })
        })
        .fail(function(){
            
        })
        .always(function(){
            
        })

    })

});