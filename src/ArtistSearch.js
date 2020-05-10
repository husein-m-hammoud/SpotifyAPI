import React from "react";
import "./ArtistSearch.css";
import StarRatings from 'react-star-ratings';

const ArtistSearch = props => {
  
  
const artist=props.items;
 
  return (
    <a  href={"#"} className="link"> 
    <div className="artistcard" onClick={props.onClick}>
      {artist.images[0] &&(
        <div  className="cardimgg" >
        <img src={artist.images[0].url} className="cardimgg" alt="img"/>
        </div>
      
      )}
   
    
      <div className="cardtext">
        <h2>{artist.name}</h2>
        <div className="row text">
        
          <p className="col-md-4">{artist.followers.total}</p>
          <p className="col-md-2"> followers</p>
        </div> 
        <StarRatings
            rating={artist.popularity/20}
            starRatedColor="red"            
            numberOfStars={5}
            name='rating'
            starDimension="20px"
          starSpacing="1px"
          />
      </div>
   
       
    
    </div>  
      </a>
    
  );
}

export default ArtistSearch;