
var apiKey = "https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${movieTitle}&key=AIzaSyB8LA4BQojhhjwpGFhSFEYQrJHdC1PXiYI"



$('#search-btn').on('click', function (e) {
    var movieTitle = $('#query').val();
    e.preventDefault();
    console.log(movieTitle);

    getYoutubeTrailer(movieTitle);
    console.log(response.items)

})



//following are for youtube movie trailers
function getYoutubeTrailer(movieTitle) {
   if (movieTitle !== undefined) {
   $.get(`https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${movieTitle}&key=AIzaSyB8LA4BQojhhjwpGFhSFEYQrJHdC1PXiYI`,
   function(response) {
       console.log(response.items)
       var idArray = []
       response.items.forEach(function(cur) {
           idArray.push(cur.id.videoId);
       });
       function printVids(youtubeArray){
           console.log('akuna');
           return youtubeArray.map(function(cur, index) {
               console.log(index);
            $(`.iframe${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
        });
   }         printVids(idArray);
});
   };
};