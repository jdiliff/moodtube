const apiKey = "https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${moodPlaylist}song&key=AIzaSyB8LA4BQojhhjwpGFhSFEYQrJHdC1PXiYI"



//ON CLICK FUNCTION TO INITIATE API
$('#search-btn').on('click', function (e) {
    let moodPlaylist = $('#emotion').text(); 
    e.preventDefault();
    console.log(moodPlaylist); 
    // console.log(moodPlaylist);

    getYoutubeTrailer(moodPlaylist);
    // console.log(response.items)

})



//
function getMusic(moodPlaylist) {
   if (moodPlaylist !== undefined) {
       //AJAX CALL
   $.get(`https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${moodPlaylist}song&key=AIzaSyB8LA4BQojhhjwpGFhSFEYQrJHdC1PXiYI`,
   function(response) {
    //    console.log(response.items)
    //FOR LOOP TO PUSH MOODPLAYLIST INTO 
       let idArray = []
       response.items.forEach(function(cur) {
           idArray.push(cur.id.videoId);
       });
       //NEW FOR LOOP TO APPEND VIDEOS
       function printVids(youtubeArray){
           return youtubeArray.map(function(cur, index) {
            //    console.log(index);
            //ADD IFRAME CLASS SO THE VIDEOS APPEND TO THE PAGE WITH THE ONLICK 
            $(`.iframe${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
    
            $(`.iframe${index}`).attr('class', `card-header`)
        });
        //APPEND YOUTUBE VIDEOS
   }         printVids(idArray);
});
   };
};
