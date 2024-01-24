export interface User {
  email: string,
  username: string,
  __v: number,
  _id: string,
}


export interface TagInfo {
  user: User,
  index: number,
  func: () => void
}

export interface ChatAreaInput{
  currentTarget: number,
  usernames:User[],
  currentUser:User,
  openCanvas: () => void;
}