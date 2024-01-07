import axios from "axios";
import { useEffect, useState } from "react"


function App() {

  const [usernames, setUsernames] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/users")
    .then((res) => {
      const profiles = res.data
      console.log(profiles)
      setUsernames(profiles.allUsername)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap h-full">
        <div className="w-1/6">
          <div className="p-4">
            <div className="p-4">
              <h1 className="text-center">All Users</h1>        
            </div>
            {usernames.map((item, index) => (
              <div key={index} className="userTag p-4 mb-4 flex  items-center">
                <div className="bg-gray-800 h-10 w-10 rounded-full flex justify-center items-center text-white me-3">
                  <p>{item[0]}</p>
                </div>
                <p className="font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-200 w-5/6 h-full flex flex-col">
          <div className="p-4">
            <h1 className="text-center">Chat Room</h1>        
          </div>
          <div className="p-4 grow bg-slate-700">
            
          </div>

          <div className="bg-slate-300">

          </div>
        </div>

      </div>


    </div>
  )
}

export default App
