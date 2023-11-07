"use client"

import { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"
import Hamburger from "./components/icons/Hamburger"
import Search from "./components/icons/Search"
import { api } from "./_trpc/api"


export default async function Client({user}: {user:User}) {

    const [searchResults, setsearchResults] = useState<(User[] | never[])>([])
    const [search, setsearch] = useState<boolean>(false)

    const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        const res = await api.searchUser("")
        if (res?.result){
            !search && setsearch(true)
            setsearchResults(res.users)
        }
    }

    return (
        <main className="p-[2vh] w-screen min-h-screen" style={{ background: 'rgb(var(--background-start-rgb))' }}>
            <div className="w-full h-[96vh] flex border border-slate-400 border-opacity-30 rounded-xl overflow-hidden">
                {/* Left chats option */}
                <div className="w-full sm:w-[50%] md:w-[40%] xl:w-[30%] bg-slate-50">
                    <div className="relative mt-1 overflow-hidden w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Hamburger />
                        </div>
                        <input type="text" onChange={handleSearch} name="price" id="price" autoComplete="false" className="pl-14 w-full p-3 text-sm border-l border-slate-400 border-opacity-30 outline-none" placeholder="Search for People" />
                        <div className="absolute inset-y-0 right-4 flex items-center">
                            <Search />
                        </div>
                    </div>
                    {/* {search && <div className="bg-slate-700 text-xs text-center w-100 py-0.5 text-white">Search Results</div>} */}

                    {searchResults && <div>
                        {searchResults.map(user => {
                            return (
                                <div className='w-full h-[100px]'>

                                </div>
                                // <ChatCard {...user}  setMessages={setMessages} setchatOpened={setchatOpened} setchatOpenedName={setchatOpenedName}/>
                            )
                        })}
                    </div>}

                    {/* {!search && <div>
                        {people.map(user => {
                            return (
                                <ChatCard {...user} setMessages={setMessages} setchatOpened={setchatOpened} setchatOpenedName={setchatOpenedName} />
                            )
                        })}
                    </div>} */}
                </div>
                {/* Right Chat */}
                <div className="flex-grow bg-slate-500 flex flex-col-reverse relative">
                    {/* Type Message Here Input */}
                    {/* {chatOpened ? <form className="relative mt-1 shadow-sm" onSubmit={sendMsg}>
                        <input value={messageTyped} autoComplete="false" type="text" id="price" className="w-full p-3 text-sm border-l border-slate-400 border-opacity-30 outline-none" placeholder="Enter your Message" onChange={(e) => setMessageTyped(e.target.value)} />
                        <div className="absolute inset-y-0 right-[-1px] flex items-center overflow-hidden">
                            <button className="text-sm border p-6 pl-4 bg-green-500 text-white">Send</button>
                        </div>
                    </form> : ""} */}
                    <div className="flex flex-col-reverse p-3 pb-1 overflow-y-scroll no-scrollbar mt-14">
                        {/* {messages.map(message => {
                            return <MessageCard {...message}/>
                        })} */}
                    </div>
                    {/* Chat descrption */}
                    <div className="absolute h-14 w-full bg-white top-0 px-5 py-3 flex items-center">
                        <Image className="mr-2" src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="" width="30" height="30" />
                        <p className="text-sm mx-1">{/*chatOpenedName*/} chatopenedName</p>
                    </div>
                </div>
            </div>
        </main>
    )
}