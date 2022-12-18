import React from "react";

import UserList from "../components/UserList";
const User = ()=>{
    const USERS = [{id:'u1',image:'https://images.unsplash.com/photo-1603320045158-61d0dc0fbb33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW55fGVufDB8fDB8fA%3D%3D&w=1000&q=80',name:'Riya',placeCount:4},
    {id:'u2', image:'https://images.unsplash.com/photo-1603320045158-61d0dc0fbb33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW55fGVufDB8fDB8fA%3D%3D&w=1000&q=80', name:'nishu', placeCount:5} 
                  ];
return(
    <>
    <UserList items={USERS}/>
    </>
);
}

export default User;

