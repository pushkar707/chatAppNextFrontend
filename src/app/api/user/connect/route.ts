import prisma from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {activeUserId,id} = await req.json()
    try{
        if(activeUserId !== id){
            const existingReceiver = await prisma.receiver.findFirst({
                where: {
                    senderId: activeUserId,
                    receiverId: id
                }
            })

            const existingReceiver2 = await prisma.receiver.findFirst({
                where: {
                    senderId: id,
                    receiverId: activeUserId
                }
            })       
            if(existingReceiver || existingReceiver2)
                return NextResponse.json({result:false})
            await prisma.receiver.create({
                data:{
                    senderId:activeUserId,
                    receiverId: id
                },
                include:{
                    chats:true,
                }    
            })        
            return NextResponse.json({result:true})

        }
        return NextResponse.json({result:false})
    }catch(e){
        return NextResponse.json({result:false})
    }
}