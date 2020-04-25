import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { Storage } from '@ionic/storage';
import * as firebase from "firebase"


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit  {

  user: any;
  isDarkModeEnable = false;
  constructor(private storage: Storage,
    private route: Router,private themeService: ThemeService,
    private loadingController: LoadingController) { 
      
    }

  ngOnInit(){
    
    this.getData();
   
    this.storage.get("isDarkModeEnable").then(resp => {
      if(resp)
      {
        
        this.isDarkModeEnable = true;
      }else {
        
        this.isDarkModeEnable = false
      }
    })
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
      mode: "ios",
      duration: 10000,
    });
    loading.present();
    firebase.auth().onAuthStateChanged(fireuser => {
      this.user = fireuser;
      loading.dismiss()
    })
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
