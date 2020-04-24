import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { Contacts , Contact } from '@ionic-native/contacts';


@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {

  friendList = [];
  contact: Contact = this.contacts.create();
  constructor(private contacts: Contacts,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getData()
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
      mode: "ios",
      duration: 10000,
    });
    await loading.present();
    
  }
}
