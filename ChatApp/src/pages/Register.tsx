import {Input, Button, Link} from "@nextui-org/react";
import React, { useState } from 'react';
import {EyeFilledIcon} from "../assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../assets/EyeSlashFilledIcon";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UserImage from "../assets/user.png";

import 'react-toastify/dist/ReactToastify.css';

function Register () {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  console.log(import.meta.env.VITE_NAME)
  const RegisterAccount = async () => {
    const { data } = await axios.post("/api/user", {
      username,
      password,
      email
    })
    console.log(username, password, email)
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
  return (
    <div className="flex flex-col items-center justify-items-center">
      <div className="flex flex-col items-center justify-items-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-slate-50 p-3 rounded-lg">
        <ToastContainer />
        <img
            src={UserImage}
            alt="NextUI Album Cover"
            className="p-4 bg-slate-200 my-3 w-1/3 2xl:w-1/5 rounded-lg"
          />            


        <p className="text-2xl font-bold">Sign Up</p>
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
          className="my-3 bg-default-100 rounded-medium w-3/4"
        />

        <Input 
        className="my-3 w-3/4"
          type="email"
          label="Email"
          placeholder="Enter your email"
          onValueChange={setEmail}
        />

        <Button onClick={RegisterAccount} className="my-4">Sign Up</Button>


        <p>Already have an account? <Link href="/signin">Sign In here</Link></p>
      </div>      
    </div>

  )
}


export default Register