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

  constructor(private userService: UserService, private toastCtrl: ToastController,

  )
     { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
      this.presentToast();
  }

  remove(item) {
    this.userService.removeUser(item.id);
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Khusus ADMIN KTYD',
      duration: 5000,
      position: 'middle',
      color: 'dark',
      showCloseButton: true
    });
    toast.present();
  }

}
