<<<<<<< HEAD
export interface ChatMessage {
    message: string;
    sender: 'student' | 'tutor';
  }
  
=======
export interface ChatMessage{
    createdAt?: Date,
    //data?:string,
    userId?: string,
    senderType?: string,
    message: string
}
>>>>>>> live_chat_branch
