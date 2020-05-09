import React, { Component } from "react";
import * as $ from "jquery";
import logo from "./spotify.svg";
import ArtistSearch from "./ArtistSearch"
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
      value:'',
      showartist:false,
      artists:{},
      items:[],
     
    }
    this.getCurrentlyArtist = this.getCurrentlyArtist.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getCurrentlyArtist(token) {
    
    if (this.state.value)
    {
        fetch("https://api.spotify.com/v1/search?query="+this.state.value+"&type=artist",
        {
          headers: {
          'Accept': 'application/json',
          "Authorization": " Bearer " + token
          }
        }
        ).then(res => res.json())
        .then((result) => 
        {
            this.setState({
            artists: result.artists,
            items:this.state.artists.items,
            showartist:true
            });
        },


        )
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
  handleChange(event)
  {
    this.setState({value: event.target.value},
      ()=>this.getCurrentlyArtist(this.state.token)
      );
   
  
    
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

              <div>
              <input  type="search"  placeholder="Search for an artist" className="search"  value={this.state.value} onChange={this.handleChange}/>
              
                    {this.state.showartist &&(
                        <div>
                        {this.state.items &&(
                            <div className="row">
                            {this.state.items.map(item =>(

                              <div className="col-md-3">
                              <ArtistSearch
                              items={item}
                              />
                              </div>
                            ))}
                            </div>
                        )}

                    </div>



                   )}

              </div>

              )}
          </header>
      </div>
    );
  }
}export default App;