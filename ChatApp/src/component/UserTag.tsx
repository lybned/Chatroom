
import TagInfo from "../component/User";


const UserTag: React.FC<TagInfo> = ({user, index, func}) => {
  return (
    <button key={index} onClick={ () => {func(index)}} className="w-full userTag p-4 mb-4 flex  items-center rounded-lg">
      <div className="bg-gray-800 h-10 w-10 rounded-full flex justify-center items-center text-white me-3">
        <p>{user.username[0]}</p>
      </div>
      <p className="font-black">{user.username}</p>              
  </button>
  )
}

export default UserTag