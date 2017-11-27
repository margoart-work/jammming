import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [{
                name: 'Tiny Dancer',
                artist: 'Elton John',
                album: 'Madman across the water'
            }, {
                name: 'Shape of you',
                artist: 'Ed Sheeran',
                album: 'Shape of you'
            }, {
                name: 'The Greatest',
                artist: 'Sia',
                album: 'This is acting'
            }],
            playlistName: 'Codecademy playlist',
            playlistTracks: [
                {
                    name: 'Mercy',
                    artist: 'Shawn Mendes',
                    album: 'Illuminate'
                }, {
                    name: 'Jealous',
                    artist: 'Nick Jonas',
                    album: 'Nick Jonas X2'
                }]
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    //Add Tracks to a Playlist. if the song is new it will be added to playlist ??
    addTrack(track) {
        if (this.state.playlistTracks.name !== track.id) {
            this.setState.playlistTracks({
                name: track.id
            });
        }
    }
   //??
    removeTrack(track) {
        if (this.state.playlistTracks.name === track.id) {
            this.setState.playlistTracks({
                name: track.id
            });
        }
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name
        });
    }

    //Create a Method that Saves the Playlist to a User's Account ??
    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(?
    =>
        {
//??
        }
    )
    }


    search(searchTerm) {
        console.log(searchTerm);
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}
                                       onRemove={this.removeTrack}/>
                        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
                                  onNameChange={this.updatePlaylistName} onSave={this.savePlaylist()}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
