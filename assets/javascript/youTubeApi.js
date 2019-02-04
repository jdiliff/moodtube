//PULL THE CANDIDATE EMOTIONS OUT OF THE FACEPP FUNTION SO I CAN USE THEM TO CREATE IF THEN STATEMENTS
//CREATE ONLICK FOR THE CHANGE MY MOOD AND ONE FOR THE MATCH MY MOOD
//INSIDE THE CHANGE MY MOOD SET THE QUERY TO PULL MOOD ALTERING PLAYLISTS
//INSDIE THE MATCH MY MOOD SET THE QUERY TO PULL FITTING PLAYLISTS

var apiKey = "https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${moodPlaylist}song&key=AIzaSyB8LA4BQojhhjwpGFhSFEYQrJHdC1PXiYI"

// if (candidateEmotion === neutral) {
//     moodPlaylist === "mellow"
// }

let moodPlaylist = ""
$('#search-btn').on('click', function (e) {
    var moodPlaylist = $('#emotion').text();
    e.preventDefault();
    console.log(moodPlaylist);

    getYoutubeTrailer(moodPlaylist);

})

//following are for youtube movie trailers
function getYoutubeTrailer(moodPlaylist) {
   if (moodPlaylist !== undefined && moodPlaylist !== "") {
   $.get(`https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${moodPlaylist}song&key=AIzaSyB8LA4BQojhhjwpGFhSFEYQrJHdC1PXiYI`,
   function(response) {
       console.log(response.items)
       var idArray = []
       response.items.forEach(function(cur) {
           idArray.push(cur.id.videoId);
       });
       var resultDiv = $("#searchResults");
       // empty previous search results;
       resultDiv.empty();
       // insert new results
       idArray.slice(0, 8).forEach(function(ytvid) { 
            var _iframeTemplate = '<iframe width="550" height="400" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="false"></iframe>'
            var iframeTemplate = $($.parseHTML(_iframeTemplate));
            iframeTemplate.attr('src', `https://www.youtube.com/embed/${ytvid}?fs=0&autohide=0`);
            resultDiv.append(iframeTemplate);
       });
    });
   };
};
