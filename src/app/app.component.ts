import { Component, ViewChild, ViewChildren, QueryList } from "@angular/core";

import { Platform, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { Router } from "@angular/router";

import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import * as firebase from "firebase";
import { environment } from "src/environments/environment";
import { auth } from "firebase";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { IonRouterOutlet } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  isConnected: boolean;
  public onlineOffline: boolean = navigator.onLine;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

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
              this.screenOrientation
                .lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
                .then(() => {
                  firebase.auth().onAuthStateChanged((user) => {
                    if (user && user.uid) {
                      this.route.navigate(["tabs"]);
                    } else {
                      this.route.navigate(["login"]);
                    }
                  });
                });
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

      this.platform.backButton.subscribeWithPriority(0, () => {
        this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
          if (this.route.url != "/tabs/tab1") {
            await this.route.navigate(["/tabs/tab1"]);
          } else if (this.route.url === "/tabs/tab1") {
            if (
              new Date().getTime() - this.lastTimeBackPress >=
              this.timePeriodToExit
            ) {
              this.lastTimeBackPress = new Date().getTime();
              this.presentAlertConfirm();
            } else {
              navigator["app"].exitApp();
            }
          }
        });
      });
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

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      // header: 'Confirm!',
      message: "Are you sure you want to exit the app?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Close App",
          handler: () => {
            navigator["app"].exitApp();
          },
        },
      ],
    });

    await alert.present();
  }
}
