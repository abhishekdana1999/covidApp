import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { Storage } from '@ionic/storage';
import * as firebase from "firebase"
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  user: any;
  isDarkModeEnable = false;
  constructor(private storage: Storage,private afAuth: AngularFireAuth,
    private route: Router,private themeService: ThemeService,
    private loadingController: LoadingController) { 
      
    }

  ngOnInit() {
    
    this.getDate();
   
    this.storage.get("isDarkModeEnable").then(resp => {
      if(resp)
      {
        
        this.isDarkModeEnable = true;
      }else {
        
        this.isDarkModeEnable = false
      }
    })
  }

  async getDate() {
  
    const loading = await this.loadingController.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
      mode: "ios",
      duration: 10000,
    });

    await loading.present();
    this.user = firebase.auth().currentUser
    loading.dismiss()
  }


  logout() {
    firebase.auth().signOut().then(resp => {
        this.route.navigate(['login'])
    })
  }

  toggleDark() {
  
    this.storage.get("isDarkModeEnable").then(resp => {
      if(!resp){
        this.themeService.toggleAppTheme();
        this.storage.set("isDarkModeEnable",true)
      }else {
        this.themeService.toggleAppTheme();
        this.storage.set("isDarkModeEnable",false)
      }
    })
  }
}
