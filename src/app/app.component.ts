import { Component } from "@angular/core";

import { Platform, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { Router } from "@angular/router";

import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import * as firebase from "firebase";
import { environment } from "src/environments/environment";
import { auth } from "firebase";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  isConnected: boolean;
  public onlineOffline: boolean = navigator.onLine;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private route: Router,
    private alertCtrl: AlertController,
    private screenOrientation: ScreenOrientation,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
    firebase.initializeApp(environment.firebaseConfig);
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      if (navigator.onLine) {
        
        this.androidPermissions
          .checkPermission(
            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
          )
          .then(
            (result) => {
              this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
                  firebase.auth().onAuthStateChanged(user => {
                    if(user && user.uid)
                    {
                      this.route.navigate(['tabs']);
                    }else{
                      this.route.navigate(['login'])
                    }
                  })
              })
            },
            (err) => this.getStoragePermission()
          );
      } else {
        
        this.alertCtrl
          .create({
            header: "Error",
            message: "You are not connected to internet.",
            animated: true,
            buttons: [
              {
                text: "Retry",
                cssClass: "secondary",
                handler: (blah) => {
                  location.reload();
                },
              },
              {
                text: "Exit",
                handler: () => {
                  navigator["app"].exitApp();
                },
              },
            ],
          })
          .then((alert) => {
            alert.present();
          });
      }
    });
  }

  getStoragePermission() {
    this.androidPermissions
      .requestPermissions([
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      ])
      .then((resp) => console.log("Permission Given"))
      .catch((err) => {
        console.log("Permission Denied");
      });
  }
}
