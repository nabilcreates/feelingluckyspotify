// import extract token
import extractToken from "../extractToken";

// import the play library
import {spotify_play} from '../jspotify.js'

import React from 'react'

class App extends React.Component{

    constructor(){
        super();
        this.state = {
            token: false,
            songs: false,
            song_name: 'false',
            song_artist: 'im',
            album_image: false,
        }

        this.handleClick = this.handleClick.bind(this)
    }
    
    componentDidMount(){
        this.setState({
            token: extractToken()
        })

        setTimeout(() => {
            this.getAlbum(this.state.token)
        }, 1);
    }

    getAlbum(token){
        fetch('https://api.spotify.com/v1/me/tracks?limit=50', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(d => {

            console.log(d)
            
            this.setState({
                songs: d.items
            })
            
            let randomsong = this.state.songs[Math.round(Math.random() * this.state.songs.length)]

            this.setState({
                song_name: randomsong.track.name,
                song_artist: randomsong.track.artists[0].name
            })

            this.getAlbumImage(randomsong.track.album.id, this.state.token)
            
            // Play the album
            spotify_play(token, randomsong.track.uri)
        })
    }

    getAlbumImage(id, token){
        fetch(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(d => {
            this.setState({
                album_image: d.images[0].url
            })
        })
    }

    handleClick(){
        this.getAlbum(this.state.token)
    }
    
    render(){
        return(
            <div id='container'>


                {this.state.token !== false ?
                
                <div>
                <a id='button' onClick={this.handleClick} >Feeling Lucky</a>

                {this.state.song_artist !== false && this.state.song_name !== false ? 
                    <div id='song'>
                        {/* Render album image */}
                        <img src={this.state.album_image} ></img>
                    
                        <div id='text'>
                            <h1>{this.state.song_name}</h1>
                            <p>{this.state.song_artist}</p>
                        </div>
                    </div>
                : null}
            </div>
            
        : <div>

            <h1>Please authenticate yourself</h1>
            <p>Login using your Spotify account:</p>

            <br></br>

            <a id='button' href='https://renabil.github.io/feelingluckyspotify/auth.html' >Authenticate</a>
        
            </div>}

            </div>
        )
    }
}

export default App