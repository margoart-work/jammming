import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


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

        Spotify.getAccessToken();
    }

    addTrack(track) {
        let array = this.state.playlistTracks.slice();
        let index = array.indexOf(track);
        if (index >= 0) {
            return;
        }

        array.push(track);
        this.setState({playlistTracks: array});
    }

    removeTrack(track) {
        let array = this.state.playlistTracks.slice();
        let index = array.indexOf(track);
        array.splice(index, 1);
        this.setState({playlistTracks: array});
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name
        });
    }

    //Create a Method that Saves the Playlist to a User's Account
    savePlaylist() {
        //Generates an array of uri values called trackURIs from the playlistTracks property.
        let trackURIs = Array.from(this.state.playlistTracks.uri);
        Spotify.savePlaylist();
    }

    /* update the .savePlaylist() method to call Spotify.savePlaylist().
After you call Spotify.savePlaylist(),
reset the state of playlistName to 'New Playlist' and searchResults to an empty array.
*/

    search(searchTerm) {
        Spotify.search(searchTerm).then(tracks => this.setState({searchResults: tracks}))
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults}
                                       onAdd={this.addTrack} onRemove={this.removeTrack}/>
                        <Playlist playlistTracks={this.state.playlistTracks}
                                  onAdd={this.addTrack} onRemove={this.removeTrack}
                                  onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
