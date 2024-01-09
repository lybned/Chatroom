import {Textarea, Button} from "@nextui-org/react";


function sentText() {
  return(
    <div className="bg-slate-300 flex">
      <Textarea
        label="Description"
        placeholder="Enter your description"
        className="w-full"
      />
      <Button className="h-full">Send</Button>
  </div>
  )
}

export default sentText