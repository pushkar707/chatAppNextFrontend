import React, { use } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import prisma from './lib/prismaClient'
import Client from './Client'
import { getServerSession } from "next-auth/next";
import { authOptions } from './lib/auth';

const Home = async () => {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email || ""
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        include:{
            recievers:{
                include:{
                    chats: true,
                }
            }
        }
    })
    
  return (
    <Client user={user}/>
  )
}

export default Home