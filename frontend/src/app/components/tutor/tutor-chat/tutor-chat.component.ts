import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chatServices/chatService/chat.service';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-tutor-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tutor-chat.component.html',
  styleUrl: './tutor-chat.component.css'
})
export class TutorChatComponent {

  tutorInput=''
  userId = '';
  tutorList:User[];
  tutorId=''
  userType = "Admin"

  constructor(private chatService:ChatService, private studentService:AdminServiceService){}


  ngOnInit(): void {
      this.chatService.connect()
      this.tutorId = localStorage.getItem('tutorId');
      this.fetchTutors();
      this.joinChat()
  }


  joinChat(){
    console.log();
    
    this.chatService.joinChat(this.tutorId,this.userType);
  }
  fetchTutors(){
    this.studentService.getUsersList().subscribe((res)=>{
      this.tutorList = res.data;
      console.log(res.data);
      
    })
  }


  selected:undefined | boolean =false;

  selectedStudent: User;

  selectUser(student:User) {
    console.log(student);
    
    this.selected = true;
    this.userId = student.userId
    this.selectedStudent = student;
  }

  sendMessage(){
    this.chatService.sendMessage(this.userId,this.tutorId,this.userType, this.tutorInput);
  }

}
