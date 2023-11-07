type User = {
    id: string,
    name: string,
    username: string,
    imageUrl: string | null
    email?: string,
    receivers?: Array<{}>
}

type Receiver = {
    id: string,
    receiver: User
    receiverId: String
    chats: Array<Message>
}

type Message = {
    id: String 
    message: String
    time: String
    Receiver: Receiver
    receiverId?: String
}