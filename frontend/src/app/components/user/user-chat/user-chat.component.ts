import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChatMessage } from '../../../interfaces/chatMessage';
import { ChatService } from '../../../services/chatServices/chatService/chat.service';
import { EncryptionService } from '../../../services/chatServices/encryptionService/encryption.service';
import { Subscription } from 'rxjs';
import { UserChatService } from '../../../services/chatServices/userChatService/user-chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.scss',
})
export class UserChatComponent {
  isChatboxOpen = false;
  userInput = '';
  messages: ChatMessage[] = [];
  userType = 'User';
  userId = '';

  chatService = inject(ChatService);
  userChatService = inject(UserChatService)
  encryptionService = inject(EncryptionService);

  getMessagesSubscription!: Subscription;
  getOldMessageSubscription!: Subscription;

  ngOnInit(): void {
    this.getOldMessageSubscription = this.userChatService.getOldChats().subscribe((response)=>{
      console.log('fetched older messages: ', response.data);
      this.messages.push(...response.data);
    });

    this.chatService.connect();
    const encryptedId = localStorage.getItem('userId');
    console.log("encryptedId",encryptedId);
    
    if(encryptedId){
      this.userId = this.encryptionService.decrypt(encryptedId);
      console.log("userId",this.userId);
      
    }
    if(this.userId){
      this.chatService.joinChat(this.userId,this.userType);
    }
    this.getMessages()
  }

  ngOnDestroy(): void {
    if (this.getMessagesSubscription) {
      this.getMessagesSubscription.unsubscribe();
    }
    if(this.getOldMessageSubscription) {
      this.getOldMessageSubscription.unsubscribe();
    } 
    this.chatService.disconnect();
  }

  toggleChatbox(){
    this.isChatboxOpen = !this.isChatboxOpen;
  }

  getOldMessages(){
    
  }

  getMessages(){
    this.getMessagesSubscription = this.chatService.getMessages().subscribe((message: ChatMessage)=>{
      console.log('hey, received message in the component:', message);
      
      this.messages.push(message);
      console.log(this.messages);
    })
  }

  sendMessage(){
    console.log(this.userId, this.userType, this.userInput);
    console.log("User Id",this.userId);
    
    if(this.userInput.trim() && this.userId){
      console.log(this.userId, this.userType, this.userInput);
      console.log("This is user id in teh send message",this.userId);
      
      this.chatService.sendMessage(this.userId, this.userType, this.userInput);
      this.messages.push({userId:this.userId, senderType:this.userType, message:this.userInput});
      this.userInput = '';
    }   
  }
}
