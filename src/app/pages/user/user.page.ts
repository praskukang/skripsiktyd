import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserProfile, UserService } from './../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  users: UserProfile[];

  constructor(private userService: UserService,

  )
     { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  remove(item) {
    this.userService.removeUser(item.id);
  }

}
