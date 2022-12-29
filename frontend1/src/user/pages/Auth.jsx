import React, {useState, useContext} from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_REQUIRE} from "../../shared/Utils/validators";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIelements/Card"
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css"


const Auth = ()=>{

  const auth = useContext(AuthContext)
    const[isLoginMode, setIsLoginMode]=useState(true);
    const [formState, InputHandler, setFormData]=useForm(
        {
       email:{
         value:'',
         isValid: false
       },
       password:{
         value:'',
         isValid: false
       }
        },
       false
    
     );
     
     const authSubmitHandler = event =>{
        event.preventDefault();
        console.log(formState.inputs); //send to backend 
        auth.login();
      };
      
     const switchModeHandler = ()=>{
      if(!isLoginMode){
        setFormData({
          ...formState.inputs,
          name:undefined
        }, 
          formState.inputs.email.isValid && formState.inputs.password.isValid
          )
      } else{
        setFormData({
          ...formState.inputs,
          name:{
            value: '',
            isValid:false
          }
        }, false);
      }
      setIsLoginMode(prevMode=> !prevMode)
     }   



return(
<>
<Card className="authentication">
  <h2>Login Recquired</h2>
  <hr/>
<form className="place-form" onSubmit={authSubmitHandler}>

{!isLoginMode && 
<Input
 id="name"
 element="input"
 label="Your Name"
 type="text"
 validators={[VALIDATOR_REQUIRE()]}
 errorText="Please enter a name."
 onInput={InputHandler}
/>}
<Input 
 id="email"
 element="input"
 label="email"
 type="text"
 validators={[VALIDATOR_EMAIL()]}
 errorText="Please enter a valid Email."
 onInput={InputHandler}
/>


<Input 
 id="password"
 element="input"
 label="password"
 type="text"
 validators={[VALIDATOR_MINLENGTH(5)]}
 errorText="Please enter a password."
 onInput={InputHandler}
/>

<Button type="submit" disabled={!formState.isValid}>
{isLoginMode? 'LOGIN': 'SIGNUP'}
</Button>
</form>

<Button inverse onClick={switchModeHandler}>
  SWITCH TO {isLoginMode? 'SIGNUP':'LOGIN'}
</Button>
</Card>
</>);
}

export default Auth;