const express = require("express");
const router = express.Router();
const placesControllers = require('../controllers/places-controllers');

const {check} =require('express-validator')


router.get('/:pid', placesControllers.getPlaceById);
router.get('/user/:uid', placesControllers.getPlacesByUserId);
router.post('/',[
check('title').not().isEmpty(),
check('description').isLength({min: 5}),
check('address').not().isEmpty()
],
placesControllers.createPlace

);

//trying on my own risk !!!

router.patch('/:pid',
[
check('title').not().isEmpty(),
check('description').isLength({min: 5})
],
placesControllers.updatePlaceById
);


router.delete('/:pid',placesControllers.deletePlaceById);
module.exports = router;