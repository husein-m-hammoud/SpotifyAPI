import React, { Component } from "react";
import * as $ from "jquery";
import logo from "./spotify.svg";
import "./App.css";

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

 const authEndpoint = "https://accounts.spotify.com/authorize";
 const clientId = "b2ef222df4b5426b8e641e6fbe156c4d";
 const redirectUri = "http://localhost:3000/callback";
 const scopes = [
    "user-read-private user-read-email",
   
];
class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    }
   
  }
  componentDidMount() {
 
    let _token = hash.access_token;

    if (_token) {
    
      this.setState({
        token: _token
      });
     
    }
  }

  

  render() {
 
    return (
      <div className="App">
        <header className="App-header">
        
          {!this.state.token && (
              <a
              className="loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
            <button className="login">
          
              Login
         
            <img src={logo} className="logo" alt="logo" />
            </button>
            </a>
          )}
          {this.state.token && (
          
            <h1>success</h1>
          )}
        </header>
      </div>
    );
  }
}export default App;