import prisma from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {message,receiver,senderId} = await req.json()
    console.log(receiver);
    
    await prisma.message.create({
        data:{
            message,
            receiverId: receiver,
            senderUserId: senderId
        }
    })

    return NextResponse.json({result:true})
}