import prisma from '@/app/lib/prismaClient'
import { NextRequest, NextResponse } from 'next/server'
import { json } from 'stream/consumers'
 
export async function GET(req: NextRequest, context:any) {
  let {username} = context.params
  const notUsername = req.nextUrl.searchParams.get("not")
  
  username = username.toLowerCase()
  const users = await prisma.user.findMany({
    where : {
      username:{
        search: `${username}* | *${username} -${notUsername}`
      }
    }
  })

  if(users.length)
    return NextResponse.json({exists:true,users})
  return NextResponse.json({exists:false})
}