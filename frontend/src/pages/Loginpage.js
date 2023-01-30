import { useState } from "react";
import {useNavigate } from "react-router-dom";
import validator from 'validator';
import http from "../http";
import Swal from "sweetalert2";

export default  function Loginpage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState ("");
    const [error, setError] = useState ("");
    const navigate = useNavigate();


async function submitHandler(e){
    e.preventDefault();

    //check for valid Email
    if (!validator.isEmail(email)) {
        setError ("Email is invalid");
        return;
    }

    //Check if Password matches existing password for user


    //Send information to the backend
    const {data} = await http.post("/user/login", {email, password});
    if (data.error){
        setError(data.error);
        return;
    }
    if (data.success){
        Swal.fire("Done", data.user.username + ", Login Successful.");
        navigate("/");
    }
}    


       // setError("");
        //alert("Registeration Successful");

    
    return <>
           <h1 className= "text-center text-white m-5">Login</h1> 
       <form onSubmit={submitHandler} action="" style= {{maxWidth: "450px", margin : "auto"}} className= "form">
        {error && <div className = "alert alert-danger p-2">{error}</div>}
          <input onChange={e => setEmail(e.target.value)}  type = "Email" className= "form-control mb-3" placeholder= "Email"/>
          <input onChange={e => setPassword(e.target.value)}  type = "Password" className= "form-control mb-3" placeholder= "Password"/>
          <button className="btn btn-warning w-100">Login</button>

        </form>
    </>
}