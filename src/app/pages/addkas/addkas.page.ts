import { Kas, KasService } from './../../services/kas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
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

  constructor(private router: Router, private route: ActivatedRoute, private kasService: KasService, private toastCtrl: ToastController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.kasId = this.route.snapshot.params['id'];
    if (this.kasId)  {
      this.loadKas();
    }
    this.presentToast();
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
