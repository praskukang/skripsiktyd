import { Component, OnInit } from '@angular/core';
import { UserProfile, UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.page.html',
  styleUrls: ['./edituser.page.scss'],
})
export class EdituserPage implements OnInit {

  user: UserProfile = {
    jabatan: undefined,
    createdAt: new Date().getTime(),

  };

  UserId = null;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private toastCtrl: ToastController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.UserId = this.route.snapshot.params['id'];
    if (this.UserId)  {
      this.loadUser();
    }
    this.presentToast();
  }

  async loadUser() {
    const loading = await this.loadingController.create({
      message: 'Loading User..'
    });
    await loading.present();

    this.userService.getUser(this.UserId).subscribe(res => {
      loading.dismiss();
      this.user = res;
    });
  }

  async saveUser() {

    const loading = await this.loadingController.create({
      message: 'Saving User..'
    });
    await loading.present();

    if (this.UserId) {
      this.userService.updateUser(this.user, this.UserId).then(() => {
        loading.dismiss();
        this.router.navigate(['/user']);
      });
    } else {
      this.userService.addUser(this.user).then(() => {
        loading.dismiss();
        this.router.navigate(['/user']);
      });
    }
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
