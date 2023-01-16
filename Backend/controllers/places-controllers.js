// const uuidv4 = require('../node_modules/uuid/dist/v4');
// const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

const Place = require('../models/place');

const {validationResult} = require('express-validator');
// const getCoordsForAddress = require('../utils/location');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');

//location.js
function getCoordsForAddress(adress){
    return{
        
            lat: 40.7484474,
            lng: -73.9871516
        };
}

//get places middleware function

const getPlaceById =async  (req,res,next)=>{
    const placeId = req.params.pid; 
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a place!!',500);
        return next(error);
    };
    if(!place){
     const error =  new HttpError("okrrr could not find a place for the provided id", 404);
    return next(error);
    
    }
    
    
    res.json({place: place.toObject({getters: true})});
    ;
}

//get places by user id middleware function

const getPlacesByUserId = async (req,res,next)=>{

    const userId = req.params.uid;
    let places;
try {
    places = await Place.find({creator: userId}) ;//try

} catch (error) {
    const err = new HttpError('Fetching places failed, please try again later',500);
    return next(err);
}

    if(!places || places.length===0){
      return next(
       new HttpError('could not find places for the provided user id',404)
      );
       // return res.status(404).json({message: "could not find the place!"});
    }
   res.json({places: places.map(place => place.toObject({getters:true}))});
   
   };  


//create places 

const createPlace = async (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs passed, please check your data',422)
        ); 
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
      coordinates = await getCoordsForAddress(address);
    } catch (error) {
      return next(error);
    }
    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        creator
    });

let user;
try {
   user = await User.findById(creator); 
} catch (err) {
    const error = new HttpError('Creating place failed, please try again',500);
    return next(error);
}

if(!user){
    const error = new HttpError('Could not find user for the provided id',404);
    return next(error);
}

console.log(user);

try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

    res.status(201).json({place:createdPlace});
};

//update places

const updatePlaceById= async (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // console.log(errors);
        return next(
            new HttpError('Invalid inputs passed, please check your data',422)
        ); 
    }
    
const pid = req.params.pid;
const {title, description} = req.body;

let place;
try {
    place = await Place.findById(pid);
} catch (error) {
   const err = new HttpError('Something went wrong, could not update',500); 
   return next(err);
}

place.title = title;
place.description=description;

try {
    await place.save();
} catch (error) {
    const err= new HttpError('Something went wrong!',500);
    return next(err);
};

 res.status(200).json({place: place.toObject({getters:true})});
};

//delete places

const deletePlaceById = async (req,res,next)=>{
    const pid = req.params.pid;

let place;
try {
    place = await Place.findById(pid).populate('creator');
} catch (error) {
    const err = new HttpError('Could not delete , something went wrong!!',500);
    return next(err);
}

if(!place){
    const error =  new HttpError('could not find place ',404);
    return next(error);
}


try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();


    // await place.remove();
} catch (error) {
    const err = new HttpError('Could not delete , something went wrong!!',500);
    return next(err);
}

    res.status(200).json("deleted place");

}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
