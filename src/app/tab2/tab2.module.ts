import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module





@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
