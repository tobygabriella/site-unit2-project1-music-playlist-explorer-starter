let playlistData= data;

function renderSongs(playlistArray) {
    let songElement = document.getElementsByClassName('songCards')[0];
    songElement.innerHTML = ``;
    for (let i = 0; i < playlistArray.songs.length; i++) {
        let playlistSongs = playlistArray.songs[i];
        const songCard = document.createElement("div");
        songCard.classList.add('song');
        songCard.innerHTML = `
        <div class="songImage">
            <img src="${playlistSongs.cover_art}" alt="song cover" class="song cover" width='100px' height='100px'>
        </div>
        <div class="songText">
            <p>${playlistSongs.title}</p>
            <p>${playlistSongs.artist}</p>
            <p>${playlistSongs.album}</p>
        </div>       
        `;
        console.log(songElement)
        songElement.appendChild(songCard);
    }
}

function displayPlaylist(playlistData ) {
    let index= randomPlaylist();
    let playlistArray = playlistData.playlists[index];
    document.getElementById('playlistImage').src = playlistData.playlists[index].playlist_art;
    document.getElementById('playlistTitle').innerText = playlistData.playlists[index].playlist_name;
    document.getElementById('creatorName').innerText = playlistData.playlists[index].playlist_creator;
    renderSongs(playlistArray);
}

function randomPlaylist(){
    let randomNum= Math.floor(Math.random()*(playlistData.playlists.length+1)); 
    //console.log(randomNum)     ;
    return randomNum;
}

displayPlaylist(playlistData)
