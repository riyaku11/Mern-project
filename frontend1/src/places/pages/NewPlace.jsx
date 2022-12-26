import React from "react";
import './PlaceForm.css'
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";




const NewPlace=()=>{

const [formState, InputHandler]=useForm(
   {
  title:{
    value:'',
    isValid: false
  },
  description:{
    value:'',
    isValid: false
  },
  address:{
    value:'',
    isValid: false
  }},
  false
);


  const placeSubmitHandler = event =>{
  event.preventDefault();
  console.log(formState.inputs); //send to backend 
  };

return(
    <>
    <form className="place-form" onSubmit={placeSubmitHandler}>
<Input 
 id="title"
 element="input"
 label="Title"
 type="text"
 validators={[VALIDATOR_REQUIRE()]}
 errorText="Please enter a valid title."
 onInput={InputHandler}
/>

<Input 
 id="description"
 element="textarea"
 label="Description"
 validators={[VALIDATOR_MINLENGTH(5)]}
 errorText="Please enter a valid description."
 onInput={InputHandler}
/>

<Input 
 id="address"
 element="text"
 label="Address"
 validators={[VALIDATOR_REQUIRE()]}
 errorText="Please enter a valid address."
 onInput={InputHandler}
/>

<Button type="submit" disabled={!formState.isValid}>
ADD PLACE
</Button>
</form>
    </>
);


};
export default NewPlace;