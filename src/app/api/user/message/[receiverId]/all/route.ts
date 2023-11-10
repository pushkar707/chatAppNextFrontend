import prisma from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , context: any){
    const {receiverId} = context.params
    const receiver = await prisma.receiver.findUnique({
        where: {
            id: receiverId
        },
        select:{
            chats:{
                orderBy: {
                    time: 'asc'
                },
                include:{
                    sender:true
                }
            }
        }
    })

    return NextResponse.json({result: true, messages:receiver?.chats})
}