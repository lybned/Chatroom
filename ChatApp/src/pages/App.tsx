import axios from "axios";
import { useEffect, useState, useRef } from "react"
import {Textarea, Button} from "@nextui-org/react";
import MessageBox from "../component/MessageBox";
import { User, Message } from "./types";
import {io} from "socket.io-client";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import UserTag from "../component/UserTag";
import { redirect } from "react-router-dom";

function App() {
    if (localStorage.getItem("user") === null) {
      console.log(`localStorage.getItem("user")`, localStorage.getItem("user"))
      redirect("/signin"); // Redirect to the login page
    }  
  let socket = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const [usernames, setUsernames] = useState<User[]>([]);
  const [currentTarget, setCurrentTarget] = useState<number>(-1);
  const [message, setMessage] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>()
  const [currentMessages,setCurrentMessage] = useState<Message[]>([])
  const [arrivalMessage, setArrivalMessage] = useState<Message>()

  const scrollRef = useRef()

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


  useEffect(() => {

    //If someone is logged in
    if (currentUser){
      socket.current = io(import.meta.env.VITE_API_BASE_URL);
      socket.current.emit("add-user", currentUser._id);
    }

    console.log("socket.current", socket.current)
  }, [currentUser])


  useEffect(() => {
    console.log(currentUser, currentTarget)
    if (currentUser && currentTarget > -1 && usernames[currentTarget]){
      axios.get("/api/messages", {
        params: {
          from: currentUser?._id,
          to: usernames[currentTarget]?._id        
        }
      }).then(res => {
        console.log(res)
        setCurrentMessage(res.data.returnData)
      })      
    }

  }, [currentTarget, currentUser, usernames])

  const sendMessage = async () => {
    console.log(message, currentUser?._id, usernames[currentTarget]?._id)
    await axios.post("/api/message", {
      message: message,
      from: currentUser?._id,
      to: usernames[currentTarget]?._id,
    })
    .then((res) => {
      console.log(res)
    }).catch((err) => {
      console.error(err)
    })

    //Current user
    socket.current.emit("send-msg", {
      to: currentUser._id,
      from: usernames[currentTarget]?._id,
      message: message,
      sender: currentUser?._id,
      date: (new Date()).toDateString()
    })

    let messages = [...currentMessages];
    const newMessage = {self: true, message: message, time: (new Date()).toDateString()}
    messages.push(newMessage)
    setCurrentMessage(messages)
    setMessage("")

  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        console.log(data.message, data.date)
        setArrivalMessage({self:false, message: data.message, time:data.date})
      })

      socket.current.on("all", (data) => {
        console.log("datadata", data)
        //setArrivalMessage({self:false, message: data.message, time:data.date})
      })
    }
    console.log("socket.current",socket.current)    
  }, [socket])

  //When there is a new arrival message
  useEffect(() => {
    arrivalMessage && setCurrentMessage((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth"})
  }, [currentMessages])

  return (
    <div className="w-full h-full p-5">
      <div className="flex flex-wrap h-full">
        <div className="w-1/4 2xl:w-1/6 h-full bg-gray-100 hidden lg:block">
          <div className="p-4">
            <div className="p-4">
              <h1 className="text-center">All Users</h1>        
            </div>
            {usernames.map((item, index) => (
              <UserTag user={item} index={index} func={setCurrentTarget}/>
            ))}
          </div>
        </div> 
        <div className="bg-slate-200 w-full lg:w-3/4 2xl:w-5/6 h-full flex flex-col">
          <div className="p-4 flex justify-between align-center">

            {
              currentTarget > -1 ? 
              (
                <div className="flex  items-center">
                  <div className="bg-gray-800 h-10 w-10 rounded-full flex justify-center items-center text-white me-3">
                    <p>{usernames[currentTarget].username[0]}</p>
                  </div>
                  <p className="font-black">{usernames[currentTarget].username}</p>
                </div>
              ) : 
              (<></>)
            }  
            <div className="block lg:none">
              <button type="button" onClick={() => {toggleOffcanvas()}} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg block lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="p-4 grow bg-slate-700 overflow-x-hidden overflow-y-scroll">
            {currentMessages.map((item, index) => (
              <div className="flex justify-between" key={index}>
                {item.self ? (<><MessageBox text={item} username={currentUser.username}/> <div></div></>) : (<><div></div> <MessageBox text={item} username={usernames[currentTarget].username}/> </>)}
              </div>
            ))}
          </div>

          <div className="flex bg-white">
            <Textarea
              placeholder="Enter your message"
              className="w-full"
              onValueChange={setMessage}
              value={message}
            />
            <Button className="h-full" onClick={() => {sendMessage()}}><PaperAirplaneIcon/></Button>
          </div>
        </div>

      </div>

      <div className={`fixed top-0 left-0 z-40 gray-background w-full h-full gray-background ${isOpen ? 'flex' : 'hidden'}` } >
        <div className="w-2/3 sm:w-1/3 h-full bg-gray-100">
          <div className="p-4">
            <div className="p-4">
              <p className="text-center">All Users</p>        
            </div>
            {usernames.map((item, index) => (
              <UserTag user={item} index={index} func={setCurrentTarget}/>
            ))}
          </div>
        </div>
        <button className="w-1/3 sm:w-2/3 h-full" onClick={toggleOffcanvas}>
          <div></div>
        </button>
      </div>
      
    </div>
  )
}

export default App
