import { Message, MessageInfo } from "./types";

const MessageBox: React.FC<MessageInfo> = ({ text, username}) => {
  console.log(text, username)
  return (
    <div className="my-2">
      {text.self ? 
      (
      <>
        <p>
          <span className="text-white text-xl font-bold me-3">{username}</span>
          <span className="text-white extra-small">{text.time}</span>
        </p>
        <div className="">
          <div className="bg-white rounded-lg px-5 py-3 w-fit">
            <p>{text.message}</p>
          </div>           
        </div>      
      </>

      ) 

      :

      (
      <>
        <p className="text-end">
          <span className="text-white extra-small me-3">{text.time}</span>
          <span className="text-white text-xl font-bold">{username}</span>
        </p> 
        <div className="flex justify-end">
          <div className="bg-white rounded-lg px-5 py-3 w-fit">
            <p>{text.message}</p>
          </div>           
        </div>             
      </>
)}
     

   
    </div>

  );
}

export default MessageBox;