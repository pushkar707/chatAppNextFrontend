import React from 'react'

function MessageCard({message,sender,time,senderUserId,user}:{message:string,sender:any,time:string,senderUserId:string,user:User}) { 
  let senderMessage = false
  const userId = user.id
  if(userId == senderUserId){
    senderMessage = true
  }
  
  return (
    <div className={`max-w-[40%] w-fit bg-white rounded-md p-2 ${senderMessage && 'self-end'} mb-1`}>
        <p className="text-xs text-slate-700 mb-1">{sender.name}</p> {/* Sender Name */}
       <div className="flex items-end justify-between overflow-hidden w-100">
            <p className="text-sm" style={{overflowWrap:"anywhere"}}>{message}</p> {/* Message */}
            {/* <p className='text-xs mb-[-2px] text-right text-slate-500 ml-4'>{time}</p> */}
       </div>
    </div>
  )
}

export default MessageCard