import { Component } from '@angular/core';
import { DataService } from '../services/data-services.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  countries: any;
  data: any;
  p: number = 1;
  constructor(private appService: DataService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getData();
  }

  search() {
    const searchbar = document.querySelector('ion-searchbar');
    const items = Array.from(document.querySelector('ion-list').children);
    searchbar.addEventListener('ionInput', handleInput);
    function handleInput(event) {
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach((item) => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          shouldShow ? item.removeAttribute('hidden') : item.setAttribute('hidden', 'hidden');
        });
      });
    }
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
      mode: "ios",
      duration: 10000
    });
    await loading.present();
    this.appService.getData().subscribe(res => {
      this.data = res;
     
      this.countries = this.data['Countries'];
      this.countries.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed) ? 1 : -1);
      loading.dismiss();
      setTimeout(() => {
        this.search();
      }, 200);
    }, (error) => {
      if(error.statusText == "Unknown Error")
      {
        this.getData()
      }
      loading.dismiss();
    });
  }


  doRefresh(event) {
    this.data = [];
    this.countries = [];
    this.getData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
