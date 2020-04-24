import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { MapComponent } from './map/map.component';


const routes: Routes = [
  {path: 'map' , component: MapComponent}
]

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page , MapComponent]
})
export class Tab3PageModule {}
