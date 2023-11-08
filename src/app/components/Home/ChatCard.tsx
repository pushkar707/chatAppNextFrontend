"use client"
import Image from "next/image"
import {MouseEvent} from "react"
// {name:string,username:string,email:string,_id:string}
function ChatCard({user,activeUserId,chat,setMessages,setchatOpened,setchatOpenedName}:{user:any,chat:any, activeUserId:string , setMessages: Function , setchatOpened:Function , setchatOpenedName:Function}) {
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
    connectChats(event)
    // if(!chat.chats.length){
    //   console.log("fsdfcersdcs");
      
    //   connectChats(event)
    // }
    // setMessages(chat.chats)
    // setchatOpened(_id)
    // setchatOpenedName(name)
  }


  return (
    <div className="p-4 border-b border-b-slate-500 border-opacity-40 flex items-center cursor-pointer" onClick={openChats}>
        <Image className="mr-2" src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="" width="55" height="55" />
        <div>
            <p className="text-sm mb-1">{name}</p>
            {/* {chat.chats.length ? <p className="text-xs">{chat.chats[0].message}</p> : ""} */}
        </div>
    </div>
  )
}

export default ChatCard