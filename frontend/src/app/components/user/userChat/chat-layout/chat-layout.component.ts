import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css'
})
export class ChatLayoutComponent {


  userList = [
    { name: "Alice", image: "https://via.placeholder.com/40",lastSeen:"Today" },
    { name: "Bob", image: "https://via.placeholder.com/40" },
    { name: "Charlie", image: "https://via.placeholder.com/40" },
    { name: "Diana", image: "https://via.placeholder.com/40" },
    { name: "Eve", image: "https://via.placeholder.com/40" }
];

  selected:undefined | boolean =false;

  selectedUser: any;

  selectUser() {
    this.selected = true;
    this.selectedUser = this.userList[0];
  }


}
