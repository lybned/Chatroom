import {Input, Button} from "@nextui-org/react";
import React, { useState } from 'react';
import {EyeFilledIcon} from "../assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../assets/EyeSlashFilledIcon";

function Register () {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const RegisterAccount = () => {
    console.log(username, password, email)
  }
  return (
    <div className="flex flex-col items-center justify-items-center">
      <div className="flex flex-col items-center justify-items-center w-1/2">
        <Input 
          className="my-3"
          type="text"
          label="Username"
          placeholder="Enter your username"
          onValueChange={setUsername}
        />

        <Input
          label="Password"
          variant="bordered"
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
          className="my-3"
        />

        <Input 
        className="my-3"
          type="email"
          label="Email"
          placeholder="Enter your email"
          onValueChange={setEmail}
        />

        <Button onClick={RegisterAccount}>Register</Button>
      </div>      
    </div>

  )
}


export default Register