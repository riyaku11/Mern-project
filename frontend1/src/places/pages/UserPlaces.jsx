import React from "react";
import PlaceList from "../components/PlaceList";
import {useParams} from "react-router-dom";

const DUMMY_PLACES =[

  {
  id: 'p1',
  title:'Empire State Building',
  description:'One of the most famous sky scrapers in the world',
  imageUrl:'https://marvel-b1-cdn.bc0a.com/f00000000179470/www.esbnyc.com/sites/default/files/2020-01/ESB%20Day.jpg',
  address:'20 W 34th St., New York, NY 10001, United States',
  location:{
    lat:40.7484405,
    lng:-73.9878531
  },
  creator:'u1'
  },

  {
    id: 'p2',
    title:'Empire State Building',
    description:'One of the most famous sky scrapers in the world',
    imageUrl:'https://marvel-b1-cdn.bc0a.com/f00000000179470/www.esbnyc.com/sites/default/files/2020-01/ESB%20Day.jpg',
    address:'20 W 34th St., New York, NY 10001, United States',
    location:{
      lat:40.7484405,
      lng:-73.9878531
    },
    creator:'u2'
    }

];

const UserPlaces =()=>{
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place=> place.creator === userId);
    return <PlaceList items={loadedPlaces}/>;

    
}
export default UserPlaces;