import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: any;
  password: any;
  toast: any;
  load: any;

  constructor(public _location: Location , private authService: AuthService , private route: Router , private toastCtrl: ToastController , private loadCtrl: LoadingController) { }

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


  register(){
    this.load.present();
    this.authService
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((resp) => {
        this.authService.loginWithEmailandPassword(this.email , this.password).then(resp => {
          this.load.dismiss();
          this.toast.message = "LoggedIn Success";
          this.toast.present();
          this.route.navigate(["tabs"]);
        }).catch(err => {
          this.load.dismiss();
          this.toast.message = "Error while Logging.Please try again later";
          this.toast.present();
          this.route.navigate(["login"]);
        })
      })
      .catch((err) => {
        this.load.dismiss();
        this.toast.message = "Error while Registering.Please try again later";
        this.toast.present();
      });
  }

}
