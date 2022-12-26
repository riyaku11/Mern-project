import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
// import { VALIDATOR_MAXLENGTH } from "../../shared/Utils/validators";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/Utils/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css"

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
  
 const UpdatePlace=()=>{
    const placeId = useParams().placeId;
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
    const [formState,InputHandler]=useForm({
        title:{
            value: identifiedPlace.title,
            isValid:true
        },
        description:{
            value: identifiedPlace.description,
            isValid:true
        }
    },true)
const placeUpdateSubmitHandler = event =>{
    event.preventDefault();
    console.log(formState.inputs);
}




    if(!identifiedPlace){
        return (
            <div className="center">
                <h2>could not find place!</h2>
            </div>
        );
    }
return(
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input 
 id="title"
 element="input"
 label="Title"
 type="text"
 validators={[VALIDATOR_REQUIRE()]}
 errorText="Please enter a valid title."
 onInput={InputHandler}
 initialValue={formState.inputs.title.value}
 initialValid={formState.inputs.title.isValid}
/>

<Input 
 id="description"
 element="textarea"
 label="Title"
 validators={[VALIDATOR_MINLENGTH(5)]}
 errorText="Please enter a valid description."
 onInput={InputHandler}
 initialValue={formState.inputs.description.value}
 initialValid={formState.inputs.description.isValid}
/>

<Button type="submit" disabled={!formState.isValid}>
 UPDATE PLACE
</Button>

    </form>
);

 }

 export default UpdatePlace;