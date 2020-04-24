import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  toast: any;
  load: any;
  email: any;
  
  constructor(
    public _location: Location,
    private authService: AuthService,
    private route: Router,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    this.toast = await this.toastCtrl.create({
      duration: 2500,
      position: "top",
      mode: "ios"
    });
    this.load = await this.loadCtrl.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
      mode: "ios"
    });
  }

  forgot() {
    this.load.present();
    this.authService
      .forgotPassword(this.email)
      .then((resp) => {
        this.load.dismiss();
        this.toast.message = "Password Resent Email Sent.Please Check";
        this.toast.present();
        this.route.navigate(["login"]);
      })
      .catch((err) => {
        this.load.dismiss();
        this.toast.message = "Error while Sending Email.Please try again later";
        this.toast.present();
      });
  }
}
