import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { User, AuthService } from './../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  private loading: any;

  selectedPath = '';

  pages = [
    {
      title: 'Info KTYD',
      url: '/sidemenu/info'
    },
    {
      title: 'Kas KTYD',
      url: '/sidemenu/kas'
    },
    {
      title: 'User KTYD',
      url: '/sidemenu/user'
    }
  ];

  constructor(private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {  }

  async logout() {
  await this.presentLoading();

  try {
    await this.authService.logout();
  } catch (error) {
    console.error(error);
  } finally {
    this.loading.dismiss();
  }
}

async presentLoading() {
  this.loading = await this.loadingCtrl.create({ message: 'Loading...' });
  return this.loading.present();
}

}
