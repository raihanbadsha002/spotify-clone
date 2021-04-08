import { useEffect } from 'react';
import SpotifyWebApi from "spotify-web-api-js";
import './App.css';
import Login from './components/Login';
import Player from './components/Player';
import { getTokenFromResponse } from './components/Spotify';
import { useStateValue } from './components/StateProvider';

import firebase from "firebase/app";
import firebaseConfig from './firebase.config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const s = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
     // Set token
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {

      // s.setAccessToken(_token);
       dispatch({ 
         type: "SET_TOKEN",
         token: _token,
       });

       s.getPlaylist("").then((response) => 
         dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
         })
       );

       s.getMyTopArtists().then((response) =>
       dispatch({
         type: "SET_TOP_ARTISTS",
         top_artists: response,
       })
     );

     dispatch({
       type: "SET_SPOTIFY",
       spotify: s,
     });

     s.setAccessToken(_token);
     s.getMe().then((user) => {
       dispatch({
         type: "SET_USER",
         user: user,
       });
     });

     s.getUserPlaylists().then((playlists) => {
       dispatch({
         type: "SET_PLAYLISTS",
         playlists: playlists,
       });
     });
    }
  }, [token, dispatch]);

  return (
    <div className="App">
    {
      token ? <Player spotify={s}/> : <Login/>
    }
      
    </div>
  );
}

export default App;
