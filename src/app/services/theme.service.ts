import { Injectable, RendererFactory2 } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
@Injectable({
  providedIn: "root",
})
export class ThemeService {
  darkmode: boolean = false;

  constructor(private plt: Platform, private statusBar: StatusBar) {
    this.plt.ready().then(() => {
      const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
      preferDark.addListener((e) => {
        console.log("matched:", e);
        this.setAppTheme(e.matches);
      });
    });
  }

  toggleAppTheme() {
    this.darkmode = !this.darkmode;
    this.setAppTheme(this.darkmode);
  }

  setAppTheme(dark) {
    this.darkmode = dark;

    if (this.darkmode) {
      document.body.classList.add("dark");
      this.statusBar.styleBlackOpaque();
      this.statusBar.backgroundColorByHexString("#000000");
    } else {
      document.body.classList.remove("dark");
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#ffffff");
    }
  }
}
