//STANDARD VARIABLES

var calls = 0;
var current_city;

//Center stuff
function centerContent(object_to_position) {
    var window_height = $(window).height();
    var window_width = $(window).width();
    var object_height = object_to_position.height();
    var object_width = object_to_position.width();
    var margin_height_needed = (window_height - object_height) / 2;
    var margin_width_needed = (window_width - object_width) / 2;

    object_to_position.css('margin-top', margin_height_needed).css('margin-left', margin_width_needed);
};

function fullSize(object_to_resize){
	var window_height = $(window).height();
	object_to_resize.css('height',window_height);
}

//get bg from city
function getBG(query) {
    $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c7e2225bd94114432bf360523e95a172&text=" + query + "&sort=interestingness-desc&format=json&nojsoncallback=1", function(data) {
        //get photo list
        var size = data.photos.photo.length;

        if(size > 100){
            size = 100;
        }

        if(size == 0){
        	$('#search-full').text('Really nothing found for ' + query);
        	$('#loader').show();
        	return;
        }

        //get one photo
        var specific = data.photos.photo[Math.floor(Math.random() * size)];
        //get url
        var photo_url = 'https://farm' + specific.farm + '.staticflickr.com/' + specific.server + '/' + specific.id + '_' + specific.secret + '_b.jpg';

        $('#bg').css('background-image', 'url(' + photo_url + ')');
		$('.predict').addClass('border-less');

    });
}

//get city from query
function getCity(query) {
    $.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + query, function(data) {
        var content = data[0];
        if (data.length == 1 && data[0] == "") {
            $('#search-full').text('no city found, looking for ' + query);
            getBG(query);
            return;
        }
        $('#search-full').text(data[0]);
        $('#search-full').addClass('found');
        var splitted = content.split(",");
        var single_city = splitted[0];
        getBG(single_city);
    });
};

//setup the search
function setupSearch() {
    //bind event
    $("#search").on("input", function() {

    	//don't load and load and load
    	calls++;

        setTimeout(function(initited) {

        	if(calls == 1)
        		handleSearch();
        	calls--;

        }, 400);
    });
    $("#search-full").click(function() {
        event.preventDefault();
        if($(this).text() != "" || $(this).text() != "no city found")
        	getCity($('#search').val());
    });
    $('#search').focus();
}

//handle search
function handleSearch() {
    //get content
    var content = $('#search').val();
    //hide details
    $('.result').hide();
    if (content.length > 2) {
        $('#loader').hide();
        //run and fill
        getCity($('#search').val());
    } else {
    	$('#loader').show();
    	if(content.length == 0){
        	//getBG('mountains');
    	}

        resetSearch();
    }

}

function resetSearch(){
	//show hint & hide predictions
	$('.section-description').show();
    $('#search-full').text('');
    $('#search-full').removeClass('found');
    $('#bg').css('background-image', 'url()');
    $('.predict').removeClass('border-less');
}
