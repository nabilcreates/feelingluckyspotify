import extractToken from "./extractToken";
import {spotify_play} from './jspotify.js'

let token = extractToken()
let albums = [];

// Get all the albums
function getAlbum(){
    fetch('https://api.spotify.com/v1/me/albums', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(r => r.json())
    .then(d => {
        albums = d.items

        
        let randomalbum = albums[Math.round(Math.random() * albums.length)]
        spotify_play(token, randomalbum.album.id)
    })
}

getAlbum()