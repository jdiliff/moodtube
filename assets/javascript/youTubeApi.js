//PULL THE CANDIDATE EMOTIONS OUT OF THE FACEPP FUNTION SO I CAN USE THEM TO CREATE IF THEN STATEMENTS
//CREATE ONLICK FOR THE CHANGE MY MOOD AND ONE FOR THE MATCH MY MOOD
//INSIDE THE CHANGE MY MOOD SET THE QUERY TO PULL MOOD ALTERING PLAYLISTS
//INSDIE THE MATCH MY MOOD SET THE QUERY TO PULL FITTING PLAYLISTS
const apiKey = "https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${moodPlaylist}song&key=AIzaSyB8LA4BQojhhjwpGFhSFEYQrJHdC1PXiYI"

// if (candidateEmotion === neutral) {
//     moodPlaylist === "mellow"
// }


$('#search-btn').on('click', function (e) {
    let moodPlaylist = $('#emotion').text(); 
    e.preventDefault();
    console.log(moodPlaylist); 
    // console.log(moodPlaylist);

    getYoutubeTrailer(moodPlaylist);
    // console.log(response.items)

})



//following are for youtube movie trailers
function getYoutubeTrailer(moodPlaylist) {
   if (moodPlaylist !== undefined) {
   $.get(`https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${moodPlaylist}song&key=AIzaSyB8LA4BQojhhjwpGFhSFEYQrJHdC1PXiYI`,
   function(response) {
    //    console.log(response.items)
       let idArray = []
       response.items.forEach(function(cur) {
           idArray.push(cur.id.videoId);
       });
       function printVids(youtubeArray){
           return youtubeArray.map(function(cur, index) {
            //    console.log(index);
            $(`.iframe${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
    
            $(`.iframe${index}`).attr('class', `card-header`)
        });
   }         printVids(idArray);
});
   };
};
