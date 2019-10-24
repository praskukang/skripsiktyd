import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from './providers/fcm.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { User, AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public counter = 0;
  navigate : any;
  private loading: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.listenToNotifications().subscribe(
      (msg) => {
        if (this.platform.is('android')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });
  }
  sideMenu()
{
  this.navigate =
  [
    {
      title : "Home",
      url   : "/info",
      icon  : "home"
    },
    {
      title : "Kas KTYD",
      url   : "/kas",
      icon  : "ios-cash"
    },
    {
      title : "User KTYD",
      url   : "/user",
      icon  : "contacts"
    },
  ]
}


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();

      this.platform.backButton.subscribe(() => {
        if (this.counter == 0) {
          this.counter++;
//          this.presentToast();
          setTimeout(() => { this.counter = 0 }, 3000)
        } else {
          navigator [ 'app' ].exitApp();
        }
      })
    });
  }
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
/*  presentToast(){
    this.helper.toast({
      message:"Press again to exitApp",
      duration:3000,
      position:'bottom'
    });
  }*/
}
