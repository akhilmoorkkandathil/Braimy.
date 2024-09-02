import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../services/chatServices/chatService/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TutorService } from '../../../../services/tutorService/tutor.service';
import { Tutor } from '../../../../interfaces/tutor';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css'
})
export class ChatLayoutComponent implements OnInit {

  userInput=''
  userId = '';
  tutorList:Tutor[];
  tutorId=''
  userType = "User"

  constructor(private chatService:ChatService, private tutorService:TutorService){}


  ngOnInit(): void {
      this.chatService.connect()
      this.userId = localStorage.getItem('userId');
      this.fetchTutors();
      this.joinChat()
  }


  joinChat(){
    console.log();
    
    this.chatService.joinChat(this.userId,this.userType);
  }
  fetchTutors(){
    this.tutorService.getTutors().subscribe((res)=>{
      this.tutorList = res.data;
      console.log(res.data);
      
    })
  }


  selected:undefined | boolean =false;

  selectedTutor: Tutor;

  selectUser(tutor:Tutor) {
    console.log(tutor);
    
    this.selected = true;
    this.tutorId = tutor._id
    this.selectedTutor = tutor;
  }

  sendMessage(){
    this.chatService.sendMessage(this.userId,this.tutorId,this.userType, this.userInput);
  }


}
