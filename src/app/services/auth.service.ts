import { Injectable } from "@angular/core";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook } from "@ionic-native/facebook/ngx";

import { Platform } from "@ionic/angular";
import * as firebase from "firebase";
import { environment } from "src/environments/environment";
import { resolve } from "url";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private googlePlus: GooglePlus,

    private facebook: Facebook,
    private platform: Platform
  ) {}

  googleLogin() {
    return new Promise(async (resp, reject) => {
      try {
        if (this.platform.is("cordova")) {
          this.googlePlus
            .login(
              {
                'webClientId': '725217211342-qa6r837m97bqj8aogfnmdaoqr4ptc90k.apps.googleusercontent.com',
                'offline': true 
              }
            )
            .then((response) => {
              const googleCredential = firebase.auth.GoogleAuthProvider.credential(
                response.idToken
              );

              firebase
                .auth()
                .signInWithCredential(googleCredential)
                .then((success) => {
                  
                  resp("Success");
                });
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => {
              resp("Success");
            })
            .catch((err) => {
              reject(err);
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  facebookLogin() {
    return new Promise(async (resp, reject) => {
      try {
        if (this.platform.is("cordova")) {
          this.facebook
            .login(["public_profile", "user_friends", "email"])
            .then((response) => {
              const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
                response.authResponse.accessToken
              );

              firebase
                .auth()
                .signInWithCredential(facebookCredential)
                .then((success) => {
                  
                  resp("Success");
                });
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          firebase
            .auth()
            .signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then((response) => {
              resp("Success");
            })
            .catch((err) => {
              reject(err);
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  loginWithEmailandPassword(email, password) {
    return new Promise((resolve, reject) => {
      try {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((resp) => {
            resolve("Success");
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  createUserWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((resp) => {
            resolve("Success");
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  forgotPassword(email) {
    return new Promise((resolve, reject) => {
      try {
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then((resp) => {
            resolve("Success");
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}
