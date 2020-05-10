import React from "react";
import "./ArtistSearch.css";
import StarRatings from 'react-star-ratings';

const ALbums = props => {
  
  
const albums=props.albums;
 
  return (
  
    <div className="albumcard" >
      {albums.images[0] &&(
        <div  className="albumimgg" >
        <img src={albums.images[0].url} className="albumimgg" alt="img"/>
        </div>
      
      )}
   
    
      <div className="cardtext">
          <div className="albumname">
         {albums.name}
          </div>
        
        <p className="text">{albums.artists[0].name}</p>
        <br></br>
        <p className="text">{albums.release_date}</p>
        <div className="row text">
        
          <p className="col-md-2">{albums.total_tracks}</p>
          <p className="col-md-2"> tracks</p>
        </div> 
        
        
      </div>
   
       <div className="spotifyLink ">
        <a  href={albums.external_urls.spotify} target="_blank" className="spotifyLink link" >Preview on Spotify</a>
       </div>
    
    </div>  
      
    
  );
}

export default ALbums;