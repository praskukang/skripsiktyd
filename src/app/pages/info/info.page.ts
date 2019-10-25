import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Info, InfoService } from './../../services/info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  infos: Info[];

  constructor(private infoService: InfoService, public toastController: ToastController,

  )
     { }

  ngOnInit() {
    this.infoService.getInfos().subscribe(res => {
      this.infos = res;
    });
  }

  remove(iteminfo) {
    this.infoService.removeInfo(iteminfo.id);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Add Info Khusus ADMIN KTYD',
      duration: 4000,
      position: 'middle',
      color: 'dark',
    });
    toast.present();
  }

}
