import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { NetworkService } from './services/network.service';
import { debounceTime } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { ThemeService } from './services/theme.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isConnected: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private route: Router,
    private networkService: NetworkService,
    private alertCtrl: AlertController,
    private storage: Storage,
    private themeService: ThemeService,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.networkService
      .getNetworkStatus()
      .pipe(debounceTime(300))
      .subscribe(async (connected: boolean) => {
        
          this.isConnected = connected;
          
          
          if(this.isConnected == true)
          {
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
              result => {
                this.afAuth.authState.subscribe(resp => {
                  
                  if(resp.email) {
                    this.route.navigate(['tabs']);
                  }else{
                    this.route.navigate(['login'])
                  }
                })
              },
              err => this.getStoragePermission()
            );    
         
          }else{
            const alert = await this.alertCtrl.create({
              header: "Error",
              message: "You are not connected to internet.",
              animated: true,
              buttons: [
                {
                  text: 'Retry',
                  cssClass: 'secondary',
                  handler: (blah) => {
                      location.reload()
                  }
                }, {
                  text: 'Exit',
                  handler: () => {
                    navigator['app'].exitApp();
                  }
                }
              ]
            });

            alert.present()
          }
      });

     
    });
  }


  getStoragePermission() {
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]).then(resp => console.log("Permission Given"))
      .catch(err => {
        console.log("Permission Denied");
        
      });
  }
}
