
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    var htmlString = "<img class='bgimg' src='http://maps.googleapis.com/maps/api/streetview?size=600x400&location="+ $('#street').val() + ", " + $('#city').val() + "'>" 
    $body.append(htmlString);

    // load streetview

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
