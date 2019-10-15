import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Kas, KasService } from './../../services/kas.service';

@Component({
  selector: 'app-kas',
  templateUrl: './kas.page.html',
  styleUrls: ['./kas.page.scss'],
})
export class KasPage implements OnInit {

  kass: Kas[];

  constructor(private kasService: KasService, private toastCtrl: ToastController, private loadingCtrl: LoadingController){  }

  ngOnInit() {
    this.kasService.getKass().subscribe(res => {
      this.kass = res;
    });
  }

  remove(item) {
    this.kasService.removeKas(item.id);
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
