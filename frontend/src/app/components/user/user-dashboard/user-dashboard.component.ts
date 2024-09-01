import { Component, OnInit, } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserServiceService } from '../../../services/userServices/user-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  upcomingClasses: User[] = [];
  name:string="user";
  count = 0
  ngOnInit(): void {
    this.todaysClasses()
  }

  constructor(
    private userService: UserServiceService  ) {}

    handleRecharge(){
      
    }

    todaysClasses(){
    this.userService.getStudentClasses().subscribe({
      next: (response) => {
<<<<<<< HEAD
        //console.log(response.data);
        this.name = response.data[0].username;
        
=======
>>>>>>> live_chat_branch
        this.upcomingClasses = response.data;
       
      },
      error: (error) => {
<<<<<<< HEAD
        console.error('Error fetching classes data:', error);
=======
        console.error('Error fetching todays class data:', error);
>>>>>>> live_chat_branch
      }
    });
  }

}
