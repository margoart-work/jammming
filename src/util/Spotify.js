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
        if(newAccessToken && newExpiresIn) {
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
        }
    },
search(searchTerm) {

}

};

export default Spotify;