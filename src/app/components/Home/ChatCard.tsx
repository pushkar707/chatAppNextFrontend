"use client"
import Image from "next/image"
import {MouseEvent} from "react"
// {name:string,username:string,email:string,_id:string}
function ChatCard({user,activeUserId,chats,setMessages,setchatOpenedId,setchatOpenedName,setSearching}:{user:any,chats:any, activeUserId:string , setMessages: Function , setchatOpenedId:Function , setchatOpenedName:Function,setSearching:Function}) {
  const {name,username,id} = user  
  const connectChats = async(event: MouseEvent<HTMLDivElement>) => {
    const res = await fetch("/api/user/connect",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({activeUserId,id})
    })

    const data = await res.json()
    console.log(data);
  }

  const openChats = (event: MouseEvent<HTMLDivElement>) => {
      if(!chats.length){
        connectChats(event)
        setSearching(false)
    }
    // setMessages(chat.chats)
    setchatOpenedId(id)
    setchatOpenedName(name)
  }


  return (
    <div className="p-4 border-b border-b-slate-500 border-opacity-40 flex items-center cursor-pointer" onClick={openChats}>
        <Image className="mr-2" src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="" width="55" height="55" />
        <div>
            <p className="text-sm mb-1">{name}</p>
            {chats.length ? <p className="text-xs">{chats[0].message}</p> : ""}
        </div>
    </div>
  )
}

export default ChatCard