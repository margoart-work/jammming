//you will register a Spotify application and create a method called getAccessToken in the Spotify module.
// The method will get a user's access token so that they can make requests to the Spotify API.

let accessToken;
const client_id = '1061154da1164bbc9b258f51a6642468';
const redirect_uri = 'http://localhost:3000/';

//Create a Spotify Module
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (newAccessToken && newExpiresIn) {
            accessToken = newAccessToken[1];
            let expiresIn = Number(newExpiresIn[1]);
            //Clear the parameters from the URL, so the app doesn't try grabbing the access token after it has expired
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            let accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirect_uri}`;
            window.location = accessUrl;
        }
    },
    search(searchTerm) {
        return Spotify.getAccessToken().then(() => {
                return fetch('https://cors-anywhere.herokuapp.com/' + `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
                    headers: {Authorization: `Bearer ${accessToken}`}
                });
            }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }

                ));
            } else {
                //return empty array
                return [];
            }
        })
    },
    savePlaylist(playlistName, trackURIs) {
        if (playlistName && trackURIs) {
            const accessToken = Spotify.getAccessToken();
            const headers = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            };
            let userId;
            return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (jsonResponse.id){
                    userId = jsonResponse.id;
                    return userId;
                }
            });
        }

    }
};

export default Spotify;