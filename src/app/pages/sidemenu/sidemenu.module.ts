import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SidemenuPage } from './sidemenu.page';

const routes: Routes = [
  {
    path: '',
    component: SidemenuPage,
        children: [
          { path: 'info', loadChildren: '../info/info.module#InfoPageModule' },
//          { path: 'addinfo', loadChildren: '../addinfo/addinfo.module#AddinfoPageModule' },
//          { path: 'addinfo/:id', loadChildren: '../addinfo/addinfo.module#AddinfoPageModule' },
          { path: 'kas', loadChildren: '../kas/kas.module#KasPageModule' },
          { path: 'user', loadChildren: '../user/user.module#UserPageModule' },
        ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SidemenuPage]
})
export class SidemenuPageModule {}
