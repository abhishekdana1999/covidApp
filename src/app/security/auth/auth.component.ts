import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { LoadingController, ToastController } from "@ionic/angular";


@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  toast: any;
  load: any;
  email: any;
  password: any;
 
  constructor(
    private authService: AuthService,
    private route: Router,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    this.toast = await this.toastCtrl.create({
      duration: 2500,
      position: "top",
      mode: "ios",
    });
    this.load = await this.loadCtrl.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
      mode: "ios",
    });
  }

  googleLogin() {
    this.load.present();
    this.authService
      .googleLogin()
      .then((resp) => {
        this.load.dismiss();
        this.toast.message = "LoggedIn Success";
        this.toast.present();
        
        this.route.navigate(["tabs/tab1"]);
      })
      .catch((err) => {
        this.load.dismiss();
        this.toast.message = "Error while logging.Please try again later";
        this.toast.present();
      });
  }

  facebookLogin() {
    this.load.present();
    this.authService
      .facebookLogin()
      .then((resp) => {
        this.load.dismiss();
        this.toast.message = "LoggedIn Success";
        this.toast.present();

        this.route.navigate(["tabs/tab1"]);
      })
      .catch((err) => {
        this.load.dismiss();
        this.toast.message = "Error while logging.Please try again later";
        this.toast.present();
      });
  }

  loginWithEmailPassword() {
    this.load.present();
    this.authService
      .loginWithEmailandPassword(this.email, this.password)
      .then((resp) => {
        this.load.dismiss();
        this.toast.message = "LoggedIn Success";
        this.toast.present();

        this.route.navigate(["tabs/tab1"]);
      })
      .catch((err) => {
        this.load.dismiss();
        this.toast.message = "Error while logging.Please try again later";
        this.toast.present();
      });
  }

}
