"use client"

import { ChangeEvent, FormEvent, useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"
import Hamburger from "./components/icons/Hamburger"
import Search from "./components/icons/Search"
import ChatCard from './components/Home/ChatCard';
import MessageCard from './components/Home/MessageCard';
import { socket } from './lib/socket';
import { revalidatePath } from 'next/cache';
// import { SocketContext } from './components/socket_context/context';


export default function Client({user}: {user:User}) {
    const [searchResults, setsearchResults] = useState<(User[] | never[])>([])
    const [searching, setSearching] = useState<boolean>(false)
    const [messages, setMessages] = useState<any[]>([])
    const [chatOpenedId, setchatOpenedId] = useState("")
    const [chatOpenedName, setchatOpenedName] = useState("")
    const [messageTyped, setMessageTyped] = useState("")
    // const [people, setpeople] = useState(user.receivers)

    const handleSearch = async (username: string) => {
        !searching && setSearching(true)
        if(username.length > 5){
            const data = await searchUser(username,user.username)

            if(data.exists){
                setsearchResults(data.users)
            }else{
                setsearchResults([])
            }
        }
        !username.length && setSearching(false)
    }

    async function sendMsg(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const receiverDb : any= user.receivers?.find((thisUser:any) => {
            return thisUser.receiverId === chatOpenedId
        })
        
        if(receiverDb){
            setMessageTyped("")
            const response = await fetch("/api/user/message/send",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message:messageTyped,receiver:receiverDb.id,senderId:user.id})
            })

            const data = await response.json()
            // Sockets
            setMessages(messages => {
                return [...messages, data.message]
            })

            let receiverId: string = await data.message.Receiver.receiverId
            
            if(receiverId == user.id){                
                receiverId = await data.message.Receiver.senderId
            }
            
            socket.emit("chatMsg",{receiverDb: receiverDb.id, receiverId});
        }else{
            console.log("Receiver not found");
        }
    }

    socket.on(user.id,async(socketData) => {
        const res = await fetch("/api/user/message/"+socketData.receiverDb+"/all")
        const data = await res.json()
        setMessages(data.messages)
    })    

    return (
        <main className="p-[2vh] w-screen min-h-screen" style={{ background: 'rgb(var(--background-start-rgb))' }}>
            <div className="w-full h-[96vh] flex border border-slate-400 border-opacity-30 rounded-xl overflow-hidden">
                {/* Left chats option */}
                <div className="w-full sm:w-[50%] md:w-[40%] xl:w-[30%] bg-slate-50">
                    <div className="relative mt-1 overflow-hidden w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Hamburger />
                        </div>
                        <input type="text" onChange={(e) => handleSearch(e.target.value)} autoComplete="false" className="pl-14 w-full p-3 text-sm border-l border-slate-400 border-opacity-30 outline-none" placeholder="Search for People" />
                        <div className="absolute inset-y-0 right-4 flex items-center">
                            <Search />
                        </div>
                    </div>
                    {searching && <div className="bg-slate-700 text-xs text-center w-100 py-0.5 text-white">Search Results</div>}

                    {searching && searchResults && <div>
                        {searchResults.map((thisUser:any) => {
                            return (
                                <ChatCard key={thisUser.id} setSearching={setSearching} user={thisUser} activeUserId={user.id} chats={thisUser.chats}  setMessages={setMessages} setchatOpenedId={setchatOpenedId} setchatOpenedName={setchatOpenedName}/>
                            )
                        })}
                    </div>}

                    {!searching && <div>
                        {user.receivers?.map((thisUser:any)=> {                
                            return (
                                <ChatCard key={thisUser.id} user={thisUser.receiver} activeUserId={user.id} chats={thisUser.chats} setSearching={setSearching} setMessages={setMessages} setchatOpenedId={setchatOpenedId} setchatOpenedName={setchatOpenedName} />
                            )
                        })}
                    </div>}
                </div>
                {/* Right Chat */}
                <div className="flex-grow bg-slate-500 flex flex-col-reverse relative">
                    {/* Type Message Here Input */}
                    {chatOpenedId ? <form className="relative mt-1 shadow-sm" onSubmit={sendMsg}>
                        <input value={messageTyped} autoComplete="false" type="text" id="price" className="w-full p-3 text-sm border-l border-slate-400 border-opacity-30 outline-none" placeholder="Enter your Message" onChange={(e) => setMessageTyped(e.target.value)} />
                        <div className="absolute inset-y-0 right-[-1px] flex items-center overflow-hidden">
                            <button className="text-sm border p-6 pl-4 bg-green-500 text-white">Send</button>
                        </div>
                    </form> : ""}
                    <div className="flex flex-col p-3 pb-1 overflow-y-scroll no-scrollbar mt-14">
                        {messages.map(message => {
                            return <MessageCard key={message.id} user={user} {...message}/>
                        })}
                    </div>
                    {/* Chat descrption */}
                   {chatOpenedName &&  <div className="absolute h-14 w-full bg-white top-0 px-5 py-3 flex items-center">
                        <Image className="mr-2" src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="" width="30" height="30" />
                        <p className="text-sm mx-1">{chatOpenedName}</p>
                    </div>}
                </div>
            </div>
        </main>
    )
}

const searchUser = async (username:string,notUsername:string) => {
    console.log(notUsername);    
   const res = await fetch(`/api/user/search/${username}?not=${notUsername}`)
    const data = await res.json()
    return data
}