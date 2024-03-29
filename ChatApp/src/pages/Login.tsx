
import {Input, Button, Link, Image} from "@nextui-org/react";
import React, { useState } from 'react';
import {EyeFilledIcon} from "../assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../assets/EyeSlashFilledIcon";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UserImage from "../assets/user.png";

import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible); 

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const SignIn = async () => {
    const { data } = await axios.post("/api/signin", {
      username,
      password
    })
    console.log(username, password)
    if (!data.status){
      console.log(data.message)
      toast.error(data.message, {
        position: "top-left"
      });
    } else {
      console.log(data)
      localStorage.setItem("user", data.token)
      navigate('/'); 
    }
  }


  return(

    <div className="flex flex-col items-center justify-items-center">
      <div className="flex flex-col items-center justify-items-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-slate-50 p-3 rounded-lg">
        <ToastContainer />

          <img
            src={UserImage}
            alt="NextUI Album Cover"
            className="p-4 bg-slate-200 my-3 w-1/3 2xl:w-1/5 rounded-lg"
          />            


        <p className="text-2xl font-bold">Sign In</p>
        <Input 
          className="my-3 w-3/4"
          type="text"
          label="Username"
          placeholder="Enter your username"
          onValueChange={setUsername}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          onValueChange={setPassword}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="bg-default-100 rounded-medium w-3/4 my-3"
        />


        <Button onClick={SignIn} className="my-4">Sign In</Button>          




        <p>Does not have an account? <Link href="/signup">Sign Up here</Link></p>
      </div>      
    </div>

  )
}

export default Login