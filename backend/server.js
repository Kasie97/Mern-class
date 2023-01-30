const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); //Cross Origin Resourse Sharing
const User = require("./models/userModels");

const app = express(); //initializing the node-express app

app.use(cors()); //allows for interacting entirely with the backend and frontend
app.use (express.json()); //allows for the information from the frontend to be extracted to the backend

//get, post,put/change/edit,delete

app.get("/", (request,response) =>{
    response.send("This is the new node server");
});

//USER ROUTES
//check and return if user already exists.
app.post("/api/users/register", async (request,response) => {
    const existingEmail = await User.findOne({email : request.body.email}) //e.g anizobaadaobi@gmail.com
    if(existingEmail){
    response.send({error  : "This email is already in use"});
    return;
    };
    //Create a new User
    const newUser = new User ({
        email : request.body.email,
        username : request.body.username,
        password : request.body.password
    })
    //Save the user
    const user = await newUser.save();
    if (user){
        response.send({success : "User saved successfully"})
    }else{
        response.send({error : "Error saving new User"})
    }

});

app.post("/api/user/login",  async (request, response) =>{
    //Check if the Email exists and return if it does not
    //Check if the password supplied matches with the existing user's password
    const existingUser = await User.findOne ({email: request.body.email});
    if (!existingUser){
        // response.send ({"Theres is no user with this email"});
        return;
    }
    if (request.body.password !== existingUser.password){
        respond.send({error : "The Password is incorrect"});
        return;
    }    
//Send a success mesage and the user information
response.send({success : "Login Successful", user : existingUser});


});

//Create a database connection
mongoose.connect("mongodb+srv://adaobi:adazobas@cluster0.p4kgxij.mongodb.net/?retryWrites=true&w=majority")
.then(response => console.log("MongoDB Connected"))
.catch(err => console.log (err));

//create a listener to detect to run the server 
app.listen(5000, () =>{
    console.log("Listening on port 5000");
});