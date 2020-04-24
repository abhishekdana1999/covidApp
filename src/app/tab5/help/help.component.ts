import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/auth";
import { LoadingController } from "@ionic/angular";
import { CometChat } from "@cometchat-pro/chat";

export interface MessageUI {
  name: string;
  image: string;
  message: string;
  date: Date;
}

@Component({
  selector: "app-help",
  templateUrl: "./help.component.html",
  styleUrls: ["./help.component.scss"],
})
export class HelpComponent implements OnInit {
  
  user: any;
  senderMessages: MessageUI[]  = [] as MessageUI[];
  recieverMessage: MessageUI[] = [] as MessageUI[];
  messageUI: MessageUI = {} as MessageUI;
  message: any;
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private loadCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getData()
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
    this.afAuth.authState.subscribe((resp) => {
      this.user = resp;
      this.loadCtrl.dismiss();
      this.messageUI.name = resp.displayName;
      this.messageUI.image = resp.photoURL;
      this.messageUI.date = new Date();
    });
  }

  sendMessage(event) {
    
    if(event.keyCode == 13 || event.type == "click")
    {
      this.messageUI.message = this.message;
      this.senderMessages.push(this.messageUI);
      this.recieverMessage.push(this.messageUI);
      console.log(this.recieverMessage , this.senderMessages)
      this.message = ""
    }

    
  }
}
