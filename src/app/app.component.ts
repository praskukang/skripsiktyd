import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from './providers/fcm.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public counter = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController
  ) {
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
/*  presentToast(){
    this.helper.toast({
      message:"Press again to exitApp",
      duration:3000,
      position:'bottom'
    });
  }*/
}
