import React, { Component } from "react";
import Albums from "./Albums"
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
 const redirectUri = "http://localhost:3000/";
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
      albums:[],
      showalbums:false,
      artistname:'',
           
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
        )}
  }
  componentDidMount() { 
    
    let _token = hash.access_token;
    if (_token) {    
      this.setState({
        token: _token       
      }
      );      
      }
   }
   componentDidUpdate(){

    var lastHistoryLength = window.history.length;
    window.onpopstate = function() {
      if (window.history.length == lastHistoryLength)
         window.location.reload();

      lastHistoryLength = window.history.length;
    };
   
  
      }
 

   getCurrentlyalbums(id,name) {    
    if (id)
    {
        fetch("https://api.spotify.com/v1/artists/"+id+"/albums?include_groups=album",
        {
          headers: {
          'Accept': 'application/json',
          "Authorization": " Bearer " + this.state.token
          }
        }).then(res => res.json())
        .then((result) => 
        {
            this.setState({
            albums: result.items,
            showalbums:true,
            artistname:name            
            });
        },
        )
    }
  }


  handleChange(event)
  {
    if(!event.target.value)
    {
      this.setState({
        showartist:false,
        value: event.target.value
      })
    }else{
      this.setState({value: event.target.value},
        ()=>this.getCurrentlyArtist(this.state.token)
        );
    }   
  } 

  render() {
   
    return (
      <div className="App">
          <header className="App-header">
            {!this.state.showalbums && (
              <div>
              {!this.state.token && (
                  <a
                  className="loginApp-link"
                  href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                  )}&response_type=token&show_dialog=true`}
                  >
                      <button className="login">

                     <b> Login</b>

                      <img src={logo} className="logo" alt="logo" />
                      </button>
                  </a>
              )}
              {this.state.token && (

              <div>
                <div class="form-group has-search">
    <span class="fa fa-search form-control-feedback"></span>
              <input  type="search"  placeholder="Search for an artist" className="search"  value={this.state.value} onChange={this.handleChange}/>
               </div>
              {this.state.showartist &&(
                  <div>
                  {this.state.items &&(
                      <div className="row">
                      {this.state.items.map(item =>(

                          <div className="col-md-3" key={item.id}>                                  
                            <ArtistSearch
                            items={item}
                            onClick={this.getCurrentlyalbums.bind(this, item.id,item.name)}
                            />                          
                            
                          </div>
                      ))}
                      </div>
                  )}

              </div>
            )}
              </div>
              )}
              </div>
              )}
              {this.state.showalbums && (
                 <div>
                 <div className="artistname">
                   <h2 className="name">{this.state.artistname}</h2>
                  </div>
                  <div className="row">
                  {this.state.albums.map(item =>(
                   
                      <div className="col-md-3" key={item.id} >                        
                        <Albums
                        albums={item}                       
                        />  
                      </div>
                     
                  ))}
                  </div>
                  </div>
              )}
          </header>
      </div>
    );
  }
}export default App;