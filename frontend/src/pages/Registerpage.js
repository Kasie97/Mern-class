import { useState } from "react" ;
import validator from 'validator';
import Swal from "sweetalert2";
import {useNavigate } from "react-router-dom"
import http from "../http";

export default function Registerpage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState ("");
    const [password, setPassword] = useState ("");
    const [confirmPassword, setConfirmPassword] = useState ("");
    const [error, setError] = useState ("");
    const navigate = useNavigate();

async function submitHandler(e){
        e.preventDefault();
        //Frontend from Validation
        //check for valid Email
        if (!validator.isEmail(email)) {
            setError ("Email format is invalid");
            return;
        }
        //check for conventional Username
        if (!validator.isAlphanumeric(username)) {
            setError("Username should only contain alphabets and numbers")
            return;

        }    
        //check for Password length
        if (password.length < 4) {
            setError("Password  must be at least 4 characters long")
            return;
        }
        //check for password match
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return;
        }
    // Sends the form information to the backend server
        const {data} = await http.post("/users/register",
         {email, username, password});
         if (data.error){
            setError(data.error)
         };
         if (data.success){
            Swal.fire("Done,", + "Welcome to the Mern Store", "success");
            navigate("/login");

    }   

};


    return <>
    <h1 className= "text-center text-white m-5">Register</h1> 
    <form onSubmit={submitHandler} action="" style= {{maxWidth: "450px", margin : "auto"}} className= "form">
     {error && <div className = "alert alert-danger p-2">{error}</div>}
     <input onChange={e => setEmail(e.target.value)}  type = "Email" className= "form-control mb-3" placeholder= "Email"/>
     <input onChange={e => setUsername(e.target.value)} type = "text" className= "form-control mb-3" placeholder= "Username"/>
     <input onChange={e => setPassword(e.target.value)}  type = "Password" className= "form-control mb-3" placeholder= "Password"/>
     <input onChange={e => setConfirmPassword(e.target.value)} type = "Password" className= "form-control mb-3" placeholder= "Password"/>
     <button className="btn btn-warning w-100">Register</button>

     </form>
    </>
};