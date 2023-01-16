const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app=express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","*");
res.setHeader("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE"); 

next();
});

app.use('/api/places',placesRoutes);

app.use('/api/users',userRoutes );
app.use((req,res,next)=>{
    const error = new HttpError('could not find this route.',404);
    throw error;
});

app.use((error,req,res,next )=>{
if(res.headerSent){
    return next(error);
}
 res.status(error.code || 500);
 res.json({message:error.message || "An unknown error occured !"});
});



mongoose.connect(
'mongodb+srv://riyaku:rQ66U579kQm5jWOv@cluster0.gh8bfye.mongodb.net/mern?retryWrites=true&w=majority'
)
.then(()=>{
    app.listen(5000);
})
.catch(err =>{
    console.log(err);
});