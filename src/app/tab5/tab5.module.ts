import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5PageRoutingModule } from './tab5-routing.module';

import { Tab5Page } from './tab5.page';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { NotificationComponent } from './notification/notification.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HelpComponent } from './help/help.component';
import { InviteComponent } from './invite/invite.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Tab5Page ,  AboutComponent,
    TermsComponent,
    NotificationComponent,
    PrivacyComponent,
    InviteComponent,
    HelpComponent]
})
export class Tab5PageModule {}
