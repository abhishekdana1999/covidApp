import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private storage: Storage , private themeService: ThemeService) {}

  ngOnInit() {
    this.storage.get("isDarkModeEnable").then(resp => {
      if(resp == null || undefined){
        this.storage.set("isDarkModeEnable" , false);
      }else if(resp == true)
      {
        this.themeService.toggleAppTheme()
      }
    })
  }
}
