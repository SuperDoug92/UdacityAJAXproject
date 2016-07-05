
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

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "c811a5e8943745babf939f2ac8a52bd4",
      'q': $('#city').val(),
      'sort': "newest"
    });

    $.getJSON(url,function(data) {
      data.response.docs.forEach(function(article){
        var htmlStr = "<a style='display:block' href='" + article.web_url +"'><h3>" + article.headline.main + "</h3><span>"+ article.byline.original + "</span><p>"+ article.lead_paragraph + "</p></a><hr>";
        $nytElem.append(htmlStr);
      })
    })
    .fail(function(err) {
      $nytElem.text("New York Times Articles could not be loaded");
    });

    var wikiURL = 'https://en.wikipedia.org/w/api.php'
    wikiURL += '?' + $.param({
      'action':'opensearch',
      'search': $('#city').val(),
      'format':'json',

    });
    // wikiURL += '&callback=?'


    $.ajax( {
      url: wikiURL,
      dataType: 'jsonp',
      headers: { 'Api-User-Agent': 'Example/1.0' },
      success: function(data) {
        data[1].forEach(function(result,index){
          var HTMLStr = "<a style='display:block' href='" + data[3][index] +"'><h3>" +
          result + "</h3><span>"+
          data[2][index] + "</span></a><hr>";
          $wikiElem.append(HTMLStr);
        })
      },
      error: function(err){
        console.log("JSONP failed");
      }
    });

    return false;
};

$('#form-container').submit(loadData);
