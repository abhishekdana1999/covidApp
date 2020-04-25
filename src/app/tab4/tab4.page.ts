import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoadingController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"],
})
export class Tab4Page implements OnInit {
  newsData: any;
  constructor(
    private http: HttpClient,
    private inAppBrowser: InAppBrowser,
    private loadCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const loading = await this.loadCtrl.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
      mode: "ios",
      duration: 10000,
    });
    await loading.present();
    

    this.http.get("https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=covid&country=india&hl=en-IN&gl=IN&ceid=IN:en").subscribe((resp: any) => {
      this.newsData = resp;
     
      loading.dismiss();
      
    })
  }

  doRefresh(event) {
    this.newsData = [];
    this.getData();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  openUrl(url) {
    const browser = this.inAppBrowser.create(url);
    browser.show()
  }


  async onSearchChange(event)
  {
    const loading = await this.loadCtrl.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
      mode: "ios",
      duration: 10000,
    });
    await loading.present();
    this.newsData = [];
    if(event.detail.value)
    {
      this.http.get(`https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=${event.detail.value}&hl=en-IN&gl=IN&ceid=IN:en`).subscribe((resp: any) => {
        this.newsData = resp;
        loading.dismiss();
        
      })
    }else {
      this.http.get(`https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=covid&hl=en-IN&gl=IN&ceid=IN:en`).subscribe((resp: any) => {
        this.newsData = resp;
        loading.dismiss();
        
      })
    }
    
  }
}
