
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

    $.getJSON();

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "c811a5e8943745babf939f2ac8a52bd4",
      'q': "Alexandria",
      'sort': "newest"
    });

    $.getJSON(url,function(data) {
      console.log(data);
      data.response.docs.forEach(function(article){
        var htmlStr = "<a style='display:block' href='" + article.web_url +"'><h3>" + article.headline.main + "</h3><span>"+ article.byline.original + "</span><p>"+ article.lead_paragraph + "</p></a><hr>";
        $nytElem.append(htmlStr);
      }
    )
      console.log(data.response.docs);
    }).fail(function(err) {
      throw err;
    });

    return false;
};

$('#form-container').submit(loadData);
