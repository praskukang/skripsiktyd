import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User, AuthService } from './../../services/auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public userRegister: User = {};
  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public keyboard: Keyboard,
    private router: Router
  ) { }

  ngOnInit() { }
/*
  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }
*/

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
      this.router.navigate(['sidemenu/info']);
    }

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Loading...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
