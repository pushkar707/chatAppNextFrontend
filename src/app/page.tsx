import React, { use } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import prisma from './lib/prismaClient'
import Client from './Client'
import { getServerSession } from "next-auth/next";
import { authOptions } from './lib/auth';

const Home = async () => {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email || ""
    let user = await prisma.user.findUnique({
        where: {
            email
        },
        include:{
            connections:{
                include:{
                    sender: true,
                    chats: {
                        orderBy: {
                            time: 'asc'
                        },
                        include:{
                            sender: true
                        }
                    }
                }
            },
            receivers:{
                include:{
                    receiver: true,
                    chats: {
                        orderBy: {
                            time: 'asc'
                        },
                        include:{
                            sender: true
                        }
                    },
                }
            }
        }
    })

    user?.connections.forEach((connection:any) => {
        connection.receiver = connection.sender
        connection.receiverId = connection.senderId
        user?.receivers.push(connection)
    })
    
    
 if (user){
    return (
        <Client user={user}/>
      )
 }
}

export default Home