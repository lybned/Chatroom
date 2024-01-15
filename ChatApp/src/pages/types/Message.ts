export interface Message {
  self: boolean,
  message:string,
  time: string
}


export interface MessageInfo{
  text: Message,
  username: string
}