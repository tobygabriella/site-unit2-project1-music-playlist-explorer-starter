const modal = document.getElementById("modal-overlay");
const span = document.getElementById("close-button");
console.log(span);

let playlistData = data;

function renderSongs(playlistArray) {
    let songElement = document.getElementsByClassName('modal-content')[0];
    songElement.innerHTML = ``;
    for (let i = 0; i < playlistArray.songs.length; i++) {
        let playlistSongs = playlistArray.songs[i];
        const songCard = document.createElement("div");
        songCard.innerHTML = `
        <div class ="song">
            <div id ="songImage">
                <img src="${playlistSongs.cover_art}" alt="song cover" class="song cover" width="70" height="70">
            </div>
            <div class="modal-text">
                <p>${playlistSongs.title}</p>
                <p>${playlistSongs.artist}</p>
                <p>${playlistSongs.album}</p>
            </div>  
        </div>
        `;
        console.log(songElement)
        songElement.appendChild(songCard);
    }
}

function openModal(playlistData, index) {
    let playlistArray = playlistData.playlists[index];
    document.getElementById('headerSong').src = playlistData.playlists[index].playlist_art;
    document.getElementById('playlist-title').innerText = playlistData.playlists[index].playlist_name;
    document.getElementById('creator-name').innerText = playlistData.playlists[index].playlist_creator;
    modal.style.display = "block";
    renderSongs(playlistArray);
    

    let shuffleButton = document.getElementById('shuffle');
    shuffleButton.addEventListener('click', function (event) {
        shuffleSongs(playlistData.playlists[index])
    });
}

span.onclick = function () {
    modal.style.display = "none";
};


console.log("lll", playlistData.playlists[0].playlist_name)

function showPlaylistCard(playlistData) {
    let playlistElement = document.getElementById('playlist-cards');
    playlistElement.innerHTML = "";
    for (let i = 0; i < playlistData.playlists.length; i++) {
        const playlist = playlistData.playlists[i];
        const playlistCard = document.createElement("div");
        playlistCard.classList.add('playlist');
        playlistCard.addEventListener('click', function (event) {
             openModal(playlistData, i)
         });
        console.log("i love", playlist.playlistID)
        playlistCard.innerHTML = `
            <img src="${playlist.playlist_art}" alt="song cover" class="song cover">
            <h3>${playlist.playlist_name}</h3>
            <p>${playlist.playlist_creator}</p>
            <span>
            
            <i id=heart-${playlist.playlistID} class="fa fa-heart" style="font-size:20px;color:red"></i>
            </span>
            <span>
            <p id =like-count-${playlist.playlistID}>${playlist.likeCount}</p>
            </span>
            <button id=delete-${playlist.playlistID}>Delete</button>
        ` ;

        playlistElement.append(playlistCard);
        const heart = document.getElementById(`heart-${playlist.playlistID}`);
        const likeElement= document.getElementById(`like-count-${playlist.playlistID}`);
        heart.addEventListener('click', function (event) {
            console.log('clicked')
            event.stopPropagation()
            playlist.likeCount++;
            if(playlist.likeCount>0){
                playlist.likeCount==0;
            }
            likeElement.innerText=playlist.likeCount;

        });

        let deleteButton = document.getElementById(`delete-${playlist.playlistID}`);
        deleteButton.addEventListener('click', function (event) {
            event.stopPropagation();
            playlistData.playlists.splice(i,1);
            showPlaylistCard(playlistData);
        });
    };
}

function shuffleSongs(playlist){
    for(let i=playlist.songs.length -1; i>0;i--){
        const j= Math.floor(Math.random()*(i+1));
        [playlist.songs[i], playlist.songs[j]]=[playlist.songs[j],playlist.songs[i]];
    }
    renderSongs(playlist)
}

showPlaylistCard(playlistData);





