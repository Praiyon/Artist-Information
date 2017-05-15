const app = {};
var input;
var image;
app.apiUrl = 'https://api.spotify.com/v1';

app.events= function() {
    $('form').on('submit',function(e){
        e.preventDefault();
        let artists = $('input[type=search]').val();
        input = artists;
        //artists = artists.split(',');
        let search = app.searchArtist(artists);
        //console.log(search);
        app.retrieveArtistInfo(search);


    });

};
app.retrieveArtistInfo = function (search){
    $.when(search)

        //console.log(search[0]);
        .then(function(){

            var artistId = search.responseJSON.artists.items[0].id;
            image = search.responseJSON.artists.items[0].images[0].url;

            let data = app.getTopTracks(artistId);

            app.retrieveTopTracks(data);
        });
}
app.getTopTracks = (id) => $.ajax({

    url:`${app.apiUrl}/artists/${id}/top-tracks`,
    method: 'GET',
    dataType: 'json',
    data:{
        country: 'CA'
    }
});

app.retrieveTopTracks = function(search){
    $.when(search)
        .then(function(){
            let songObjects = search.responseJSON.tracks;

            let songs = [];
            for( let i = 0; i<songObjects.length; i++ )
                songs.push(songObjects[i].name);
            document.getElementById("tracks").innerHTML= `<H2>Top ten songs by ${input} in Canada:</H2><br>`;
            for(let i = 0 ; i<songs.length; i++){
                document.getElementById("tracks").innerHTML= document.getElementById("tracks").innerHTML  +  (i+1) + ". " + songs[i] + "<br><br>";
            }
            console.log(image);
            document.getElementById("image").src = image;
            document.getElementById("image").style="width:304px;height:228px;";


        });


}


app.searchArtist = (artistName) => $.ajax({
    url: `${app.apiUrl}/search`,
    method:'GET',
    dataType: 'json',
    data: {
        q: artistName,
        type: 'artist'
    }
});

app.init = function(){
    app.events();
    let z = [1,2,3,4];
    //let test = z.map(app.test(2));

};
app.test= function(x){/*
app.getArtistAlbums = (id) => $.ajax({
    url: `${app.apiUrl}artists/${id}/albums`,
    method: 'GET',
    dataType: 'json',
    data: {
        album_type: 'album'
    }
});

app.retrieveArtistInfo = function (search){
    $.when(...search)
        //console.log(search[0]);
        .then((...results) =>{
            results = results.map( (res)=> res[0].artists.items[0].id)
                .map( id => app.getArtistAlbums(id));
                app.retrieveArtistAlbums(results);

        });
}
app.retrieveArtistAlbums = function(results){
    //console.log(results);
    $.when(...results)
        .then((...results) => {
             results = results.map( res => res[0].items);
             //for(int i = 0; )
             albums = [];
             for(let i = 0; i<results.length;i++){
                 for(let j = 0; j<results[i].length;j++)
                    albums.push(results[i][j]);

             }

            //app.retrieveArtistTracks(albums);
            albums = albums.map( res => res.id)
            .map(album => app.searchTracks(album));
            //console.log(albums);
            app.retrieveAlbumTracks(albums);

        });
}

function mergeArrays(results){//utility function
    array =[];
    for(let i = 0; i<results.length;i++){
        for(let j = 0; j<results[i].length;j++)
           array.push(results[i][j]);

    }
    return array;
}
function getRandomArbitrary(max) {//utility function
    return Math.floor(Math.random() * (max));
}
app.retrieveAlbumTracks = function(results){
    $.when(...results)
        .then((...results) =>{
            results = results.map(res => res[0].items);
            //results = results.map (res=> res.external_urls);
            //console.log(results);
            var tracks = mergeArrays(results);
            tracks = tracks.map(res=> res.id);
            app.generatePlaylist(tracks);

        });

}
app.generatePlaylist = function(tracks){
    playlist = [];
    for( let i = 0 ; i<3; i++){
        var num = getRandomArbitrary(tracks.length);
        playlist.push(tracks[num]);
    }
    //playlist=playlist.join();
    const  baseUrl =
    `https://embed.spotify.com/?theme=white&uri=spotify:trackset:My PLayList:${playlist.join()}`;
    $('.playlist').html(`<iframe src="${baseUrl}" height = "400"></iframe>`);
    //alert(baseUrl);

}
app.searchTracks = (id) => $.ajax({
    url:`${app.apiUrl}albums/${id}/tracks`,
    method:'GET',
    dataType:'json'

});
*/
    return (4);
}
$(app.init);
