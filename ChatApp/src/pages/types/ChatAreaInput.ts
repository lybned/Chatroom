import { User } from "./";

export interface ChatAreaInput{
  currentTarget: number,
  usernames:User[],
  currentUser:User,
  openCanvas: () => void;
}
