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

  constructor(private infoService: InfoService,

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

}
