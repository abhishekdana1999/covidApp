import { Injectable } from "@angular/core";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook } from "@ionic-native/facebook/ngx";
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from '@ionic/angular';
import * as firebase from "firebase";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private googlePlus: GooglePlus,
    private afAuth: AngularFireAuth,
    private facebook: Facebook,
    private platform: Platform
  ) {}

  googleLogin() {
    return new Promise(async (resp, reject) => {
      try {
        if(this.platform.is("cordova"))
        {
          this.googlePlus.login({}).then((response) => {
            resp("Success");
          }).catch(err => {
            reject(err)
          });
        }else{
          this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(response => {
            resp("Success");
          }).catch(err => {
            reject(err)
          })
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  facebookLogin() {
    return new Promise(async (resp, reject) => {
      try {
        if(this.platform.is("cordova"))
        {
          this.facebook
          .login(["public_profile", "user_friends", "email"])
          .then((response) => {
            resp("Success");
          }).catch(err => {
            reject(err)
          });
        }else{
          this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(response => {
            resp("Success");
          }).catch(err => {
            reject(err)
          })
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  loginWithEmailandPassword(email, password) {
    return new Promise((resolve, reject) => {
      try {
        this.afAuth.signInWithEmailAndPassword(email, password).then((resp) => {
          resolve("Success");
        }).catch(err => {
          reject(err)
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  createUserWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      try {
        this.afAuth
          .createUserWithEmailAndPassword(email, password)
          .then((resp) => {
            resolve("Success");
          }).catch(err => {
            reject(err)
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  forgotPassword(email) {
    return new Promise((resolve, reject) => {
      try {
        this.afAuth.sendPasswordResetEmail(email).then((resp) => {
          resolve("Success");
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
