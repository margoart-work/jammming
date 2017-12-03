'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var accessToken = void 0;
var client_id = '1061154da1164bbc9b258f51a6642468';
var redirect_uri = 'http://localhost:3000/';

//Create a Spotify Module
var Spotify = {
    getAccessToken: function getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        var newAccessToken = window.location.href.match(/access_token=([^&]*)/);
        var newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (newAccessToken && newExpiresIn) {
            accessToken = newAccessToken[1];
            var expiresIn = Number(newExpiresIn[1]);
            //Clear the parameters from the URL, so the app doesn't try grabbing the access token after it has expired
            window.setTimeout(function () {
                return accessToken = '';
            }, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            var accessUrl = 'https://accounts.spotify.com/authorize?client_id=' + client_id + '&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=' + redirect_uri;
            window.location = accessUrl;
        }
    },
    search: function search(searchTerm) {
        return fetch('https://cors-anywhere.herokuapp.com/' + ('https://api.spotify.com/v1/search?type=track&q=' + searchTerm + '&limit=10'), {
            headers: { Authorization: 'Bearer ' + accessToken }
        }).then(function (response) {
            return response.json();
        }).then(function (jsonResponse) {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(function (track) {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    };
                });
            } else {
                //return empty array
                return [];
            }
        });
    },
    savePlaylist: function savePlaylist(playlistName, trackURIs) {
        if (!(playlistName && trackURIs)) {
            return;
        }

        var headers = {
            'Authorization': 'Bearer ' + accessToken
        };
        var userId = void 0;
        fetch('https://cors-anywhere.herokuapp.com/' + 'https://api.spotify.com/v1/me', { headers: headers }).then(function (response) {
            return response.json();
        }).then(function (jsonResponse) {
            if (!jsonResponse.id) {
                return;
            }

            userId = jsonResponse.id;
            fetch('https://api.spotify.com/v1/users/' + userId + '/playlists', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name: playlistName })
            }).then(function (response) {
                return response.json();
            }).then(function (jsonResponse) {
                if (!jsonResponse.id) {
                    return;
                }

                var playlistID = jsonResponse.id;

                fetch('https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistID + '/tracks', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ uris: trackURIs })
                });
            });
        });
    }
};

exports.default = Spotify;
//# sourceMappingURL=Spotify.js.map
//# sourceMappingURL=Spotify.js.map