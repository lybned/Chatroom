import axios from "axios";
import { useEffect, useState } from "react"
import {Textarea, Button} from "@nextui-org/react";

interface user {
  email: string,
  username: string,
  __v: number,
  _id: string,
}

function App() {

  const [usernames, setUsernames] = useState<user[]>([]);
  const [currentTarget, setCurrentTarget] = useState<number>(-1);
  const [message, setMessage] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<user>()

  useEffect(() => {
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
      setCurrentUser(profiles.allUsers)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  const sendMessage = async () => {
    console.log(usernames, message)
    const { data } = await axios.post("/api/message", {
      message: message,
      users: [],
      message
    })
      .then((res) => {
        console.log(res)
      }).catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className="w-full h-full p-5">
      <div className="flex flex-wrap h-full">
        <div className="w-1/6 h-full bg-gray-100 ">
          <div className="p-4">
            <div className="p-4">
              <h1 className="text-center">All Users</h1>        
            </div>
            {usernames.map((item, index) => (
              <button key={index} onClick={ () => {setCurrentTarget(index)}} className="w-full userTag p-4 mb-4 flex  items-center rounded-lg">
                  <div className="bg-gray-800 h-10 w-10 rounded-full flex justify-center items-center text-white me-3">
                    <p>{item.username[0]}</p>
                  </div>
                  <p className="font-black">{item.username}</p>              
              </button>
            ))}
          </div>
        </div>
        <div className="bg-slate-200 w-5/6 h-full flex flex-col">
          <div className="p-4">

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
              (<p>Click on someone you want to chat with!</p>)
            }    
          </div>
          <div className="p-4 grow bg-slate-700">
            
          </div>

          <div className="bg-slate-300 flex">
            <Textarea
              label="Description"
              placeholder="Enter your description"
              className="w-full"
              onValueChange={setMessage}
            />
            <Button className="h-full" onClick={() => {sendMessage()}}>Send</Button>
          </div>
        </div>

      </div>


    </div>
  )
}

export default App
