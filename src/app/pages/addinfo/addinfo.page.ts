import { Info, InfoService } from './../../services/info.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.page.html',
  styleUrls: ['./addinfo.page.scss'],
})
export class AddinfoPage implements OnInit {

  info: Info = {
    judul: undefined,
    isiberita: undefined,
    createdAt: new Date().getTime(),

  };

  infoId = null;

  constructor(private router: Router, private route: ActivatedRoute, private infoService: InfoService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.infoId = this.route.snapshot.params['id'];
    if (this.infoId)  {
      this.loadInfo();
    }
  }

  async loadInfo() {
    const loading = await this.loadingController.create({
      message: 'Loading Info..'
    });
    await loading.present();

    this.infoService.getInfo(this.infoId).subscribe(res => {
      loading.dismiss();
      this.info = res;
    });
  }

  async saveInfo() {

    const loading = await this.loadingController.create({
      message: 'Saving Info..'
    });
    await loading.present();

    if (this.infoId) {
      this.infoService.updateInfo(this.info, this.infoId).then(() => {
        loading.dismiss();
        this.router.navigate(['/info']);
      });
    } else {
      this.infoService.addInfo(this.info).then(() => {
        loading.dismiss();
        this.router.navigate(['/info']);
      });
    }
  }

}
