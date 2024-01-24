
import {Textarea, Button} from "@nextui-org/react";
import MessageBox from "../component/MessageBox";
import { PaperAirplaneIcon, UserIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useRef } from "react"
import {io} from "socket.io-client";
import { ChatAreaInput, Message } from "./types";
import axios from "axios";



const ChatArea = (data : ChatAreaInput) => {
  const { currentTarget, usernames, currentUser, openCanvas } = data;
  const [message, setMessage] = useState<string>("");
  const [currentMessages,setCurrentMessage] = useState<Message[]>([])
  const [arrivalMessage, setArrivalMessage] = useState<Message>()
  const scrollRef = useRef()


  console.log("inside", currentTarget, usernames, currentUser, openCanvas)

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

  const socket = useRef();

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


  return(
    <>    
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
          <div className="block lg:none bg-gray-100 hover:bg-blue-700 text-white rounded">
            <button type="button" onClick={() => {openCanvas()}} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg block lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <UserIcon/>
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
    </>
  
  )
}

export default ChatArea