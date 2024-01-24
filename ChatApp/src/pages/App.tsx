import axios from "axios";
import { useEffect, useState } from "react"

import ChatArea from "../component/ChatArea";
import { User } from "./types";
import UserTag from "../component/UserTag";
import CurrentUserTag from "../component/CurrentUserTag";
import { redirect } from "react-router-dom";

function App() {
    if (localStorage.getItem("user") === null) {
      console.log(`localStorage.getItem("user")`, localStorage.getItem("user"))
      redirect("/signin"); // Redirect to the login page
    }  

  const [usernames, setUsernames] = useState<User[]>([]);
  const [currentTarget, setCurrentTarget] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>()

  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {

    //Temp solution. Redirect user to signin page when not authenticated

    axios.get("/api/users")
    .then((res) => {
      const profiles = res.data
      console.log(profiles)
      setUsernames(profiles.allUsers)
    }).catch((err) => {
      console.error(err)
    })

    axios.get("/api/user")
    .then((res) => {
      const profiles = res.data
      console.log(profiles)
      setCurrentUser(profiles.data)
    }).catch((err) => {
      console.error(err)
    })
  }, [])


  return (
    <div className="w-full h-full p-5">
      <div className="flex flex-wrap h-full">
        <div className="w-1/4 2xl:w-1/6 h-full bg-gray-100 hidden lg:block">
          <div className="p-4">
            <CurrentUserTag data={currentUser}/>

            {usernames.map((item, index) => (
              <UserTag user={item} index={index} func={setCurrentTarget}  key={index}/>
            ))}
          </div>
        </div>         
        {usernames ? (<ChatArea currentTarget={currentTarget} usernames={usernames} currentUser={currentUser} openCanvas={toggleOffcanvas}/>) : (<></>)}


        

      </div>
      <div className={`fixed top-0 left-0 z-40 gray-background w-full h-full gray-background ${isOpen ? 'flex' : 'hidden'}` } >
        <div className="w-2/3 sm:w-1/3 h-full bg-gray-100">
          <div className="p-4">
            <div className="p-4">
              <p className="text-center">All Users</p>        
            </div>
            {usernames.map((item, index) => (
              <UserTag user={item} index={index} func={setCurrentTarget} key={index}/>
            ))}
          </div>
        </div>
        <button className="w-1/3 sm:w-2/3 h-full" onClick={() => {toggleOffcanvas()}}>
          <div></div>
        </button>
      </div>
    </div>
  )
}

export default App
