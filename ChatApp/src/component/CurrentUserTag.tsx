import { User } from "./types";

const CurrentUserTag = (input : User) => {
  const { data } = input;
  console.log("CurrentUserTag", input)
  return (
    <>
      {data !== undefined ? (    
      <div className="flex justify-center my-5 mb-10">
        <div className="">
          <p className="text-xl">Welcome Back!</p>
          <div className="flex mt-5 justify-center">
            <div className="bg-gray-800 h-10 w-10 rounded-full flex justify-center items-center text-white me-3">
              <p>{data.username[0]}</p>
            </div>
            <p className="font-black text-2xl text-center">{data.username}</p>        
          </div>            
        </div>
    
      </div>) : (<></>)
    }    
    </>



  )
}

export default CurrentUserTag