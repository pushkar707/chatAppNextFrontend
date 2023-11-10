import prisma from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {message,receiver,senderId} = await req.json()
    
    const createdMessage = await prisma.message.create({
        data:{
            message,
            receiverId: receiver,
            senderUserId: senderId
        },
        include:{
            sender:true,
            Receiver: true
        }
    })

    return NextResponse.json({result:true,message:createdMessage})
}