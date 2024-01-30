import chatImage from "../assets/chat.jpg"

function Home() {
  return (
    <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100 via-purple-400 to-purple-500 flex justify-center">
      <div className="h-full w-full md:w-3/4 lg:w-2/3">
        <div className="flex py-3 justify-between">
          <button className="py-2 font-black text-2xl">ChatApp</button>
          <div>
            <button className="px-3 py-2 font-black text-xl rounded-full me-3 border-white border-2 hover:bg-purple-300">Login</button>
            <button className="px-3 py-2 font-black text-xl rounded-full bg-purple-700 text-white hover:bg-purple-900 ">Register</button>          
          </div>

        </div>
        <div className="my-5">
          <p className="text-3xl mb-3 font-black">Online Chat</p>
          <p className="text-5xl font-bold">Application</p>
        </div>

        <div className="flex justify-between">
          <div className="w-5/12">
            <p className="my-4">
              The app is developed by Yanbo Liu. I developed an innovative online chat application designed to redefine digital communication. 
              This platform seamlessly combines user-friendly design with cutting-edge features, creating a unique and engaging experience for users. 
              The app boasts a sleek and intuitive interface, making it easy for individuals to connect with friends, family, and colleagues effortlessly. 
              The real-time messaging system ensures instant communication, while advanced encryption guarantees user privacy and security. 
              The app is cross-platform, supporting both desktop and mobile devices, promoting accessibility and convenience. 
              Overall, this online chat app is a dynamic and versatile solution that elevates the way people connect and communicate in the digital age.
            </p>
            <button className="px-3 py-2 font-black text-xl rounded-full bg-purple-700 text-white">Get Start!</button>   
          </div>   
          <div className="w-5/12">
            <img src={chatImage}/>
          </div>        
        </div>

      </div>
    </div>
  )
}

export default Home