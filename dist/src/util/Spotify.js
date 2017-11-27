'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//you will register a Spotify application and create a method called getAccessToken in the Spotify module.
// The method will get a user's access token so that they can make requests to the Spotify API.

var accessToken = '';
var client_id = '1061154da1164bbc9b258f51a6642468';
var client_secret = '6eb4cdffe861447fb033ece93e67a3ef';
var reirect_uri = 'http://localhost:3000/';

//Create a Spotify Module
var Spotify = {
    getAccessToken: function getAccessToken() {
        if (accessToken) {
            return new Promise(function (resolve) {
                return resolve(accessToken);
            });
        } else {}
    }
};

exports.default = Spotify;
//# sourceMappingURL=Spotify.js.map