import { Kas, KasService } from './../../services/kas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addkas',
  templateUrl: './addkas.page.html',
  styleUrls: ['./addkas.page.scss'],
})
export class AddkasPage implements OnInit {

  kas: Kas = {
    debit: undefined,
    kredit: undefined,
    total: undefined,
    createdAt: new Date().getTime(),

  };

  kasId = null;

  constructor(private router: Router, private route: ActivatedRoute, private kasService: KasService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.kasId = this.route.snapshot.params['id'];
    if (this.kasId)  {
      this.loadKas();
    }
  }

  async loadKas() {
    const loading = await this.loadingController.create({
      message: 'Loading Kas..'
    });
    await loading.present();

    this.kasService.getKas(this.kasId).subscribe(res => {
      loading.dismiss();
      this.kas = res;
    });
  }

  async saveKas() {

    const loading = await this.loadingController.create({
      message: 'Saving Kas..'
    });
    await loading.present();

    if (this.kasId) {
      this.kasService.updateKas(this.kas, this.kasId).then(() => {
        loading.dismiss();
        this.router.navigate(['/kas']);
      });
    } else {
      this.kasService.addKas(this.kas).then(() => {
        loading.dismiss();
        this.router.navigate(['/kas']);
      });
    }
  }

}
