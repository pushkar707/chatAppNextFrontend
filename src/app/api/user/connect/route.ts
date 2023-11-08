import prisma from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest , context:any) {
    const {activeUserId,id} = await req.json()

    const reciever = await prisma.receiver.create({
        data:{
            senderId:activeUserId,
            receiverId: id
        },
        
    })

    return NextResponse.json({result:"Receiver Added"})


}