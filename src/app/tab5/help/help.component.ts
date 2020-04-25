import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/auth";
import { LoadingController } from "@ionic/angular";
import { CometChat } from "@cometchat-pro/chat";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  
  loginForm: FormGroup;

  constructor(
    private http: HttpClient,
    
    private loadCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['' , Validators.required],
      message: ['' , Validators.required]
    });
  }

  ngOnInit() {
    
  }

  onSubmit()
  {
    const data = this.loginForm.value;
    this.http.post("https://api.whatsapp.com/send?phone=+917304541557" , {text: `<p>Name: ${data.name}</p><br><p>Email: ${data.email}</p><br><p>Message: ${data.message}</p>`}).subscribe(resp => {
      alert(resp)
    })
  }

  
}
