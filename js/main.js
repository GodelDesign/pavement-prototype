(function($){

/* load youtube api */
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      var player;


/* Derived from NetLobo GUP function by Justin Barlow */
function gup(name, _url) {
  var url = _url || window.location.href; //default to current URL if none supplied
  var theName = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regExStr = "[\\?&]"+theName+"=([^&#]*)";
  var regEx = new RegExp(regExStr);
  var results = regEx.exec(url);
  if (results === null)
  {
    return "";
  }
  return results[1];
}

/* embed a YouTube video using the new simplified iFrame embed code */
function embedVideo(_vid) {
  var videoID = _vid || 'nd7XatmTSTM';
// loadVideoById(videoID, 5, "large");
    $('#video').html('<iframe width="640" height="360"  src="http://www.youtube.com/embed/'+videoID+'" frameborder="0" allowfullscreen></iframe>');
}

/* parse a YouTube URL to get the 11-digit Video ID - courtesy of @jeffreypriebe */
function getYouTubeID(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    // match[7] is the ID as a result of the regExp
    if (match && match[7].length === 11) {
        return match[7];
    } else {
        alert('Problem with URL');
        return false;
    }
}

/* input listener */
$('#youtube').bind('input keyup change', function() {
    var youtubeURL = $(this).val();
    var vid = getYouTubeID(youtubeURL);
    embedVideo(vid);
});

/* trying to make my own input from click */
$('.links > a').on('click', function(e) {
  e.preventDefault();
    var youtubeURL = $(this).attr('href');
    var vid = getYouTubeID(youtubeURL);
    console.log(vid);
     // $('#youtube').val(youtubeURL);
     // $('#youtube').trigger( "keyup" );
    embedVideo(vid);
});


/* onload - get from an input parameter, i.e: http://fiddle.jshell.net/bcmoney/yBP4J/show/?url=http://www.youtube.com/watch?v=8nLKHYHmPbo */
var youtubeURL = gup('url');
if(typeof youtubeURL !== 'undefined' && youtubeURL !== null && youtubeURL !== '') {
    embedVideo(getYouTubeID(youtubeURL));
}



})(jQuery);
