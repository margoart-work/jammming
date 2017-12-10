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
            searchResults: [],
            playlistName: 'ddddddd',
            playlistTracks: []
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

    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(track => {
            return track.uri;
        });
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({
            playlistName: 'New playlist',
            playlistTracks: [],
            searchResults: []
        });
    }


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
