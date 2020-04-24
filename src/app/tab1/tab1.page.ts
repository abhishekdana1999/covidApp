import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataService } from "../services/data-services.service";
import { LoadingController } from "@ionic/angular";
import { Chart } from "chart.js";
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as moment from "moment";
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  @ViewChild("confirmedChart", null) confirmedChart: any;


  loading: any;
  countries: any;
  countryData: any;
  SelectedCountry = "India";
  confirmed = 0;
  recovered = 0;
  deaths = 0;
  result: any;
  bars: any;
  dates: any;
  previousStatesList: any;


  slideOpts = {
    initialSlide: 1,
    speed: 400,
    direction: 'vertical',
  };

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private loadCtrl: LoadingController
  ) { }

  async ngOnInit() {
    
    this.http.get("https://api.covid19api.com/countries").subscribe((resp) => {
      this.countries = resp;
      this.SelectedCountry = this.countries.filter(
        item => item.Country === "India")[0];
    });
    this.getDatabyCountry("India");
    this.getStateWiseData()
  }

  async getDatabyCountry(event) {
    this.loading = await this.loadCtrl.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
      mode: "ios",
      duration: 10000,
    });
    if (event == "India") {
      this.loading.present();
      this.dataService.getDataForCountry("India").subscribe((resp) => {
        this.countryData = resp;
        
        
        this.confirmed = this.countryData[
          Object.keys(this.countryData).length - 1
        ].Confirmed;
        this.recovered = this.countryData[
          Object.keys(this.countryData).length - 1
        ].Recovered;
        this.deaths = this.countryData[
          Object.keys(this.countryData).length - 1
        ].Deaths;
        this.getConfirmedLineChart();

        this.loading.dismiss();
      });
    } else {
      this.loading.present();
      this.dataService
        .getDataForCountry(event.value.Country)
        .subscribe((resp) => {
          this.countryData = resp;


          this.confirmed = this.countryData[
            Object.keys(this.countryData).length - 1
          ].Confirmed;
          this.recovered = this.countryData[
            Object.keys(this.countryData).length - 1
          ].Recovered;
          this.deaths = this.countryData[
            Object.keys(this.countryData).length - 1
          ].Deaths;
          this.getConfirmedLineChart();
          this.loading.dismiss();
        });
    }
  }

  getDate() {
    return new Date();
  }

  getConfirmedLineChart() {
    this.bars = new Chart(this.confirmedChart.nativeElement, {
      type: "line",
      data: {
        labels: this.countryData.map((item) =>
        moment(item.Date).format("DD-MMM")
        ),
        datasets: [
          {
            label: "Confirmed",
            data: this.countryData.map((item) => item.Confirmed),
            borderColor: "#f44336",
            fill: false,
            
          },
          {
            label: "Death",
            data: this.countryData.map((item) => item.Deaths),
            borderColor: "#ffc409",
            fill: false,
            
          },
          {
            label: "Recovered",
            data: this.countryData.map((item) => item.Recovered),
            borderColor: "#2dd36f",
            fill: false,
            
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text:
            "Cases From 22 Jan To " +
            moment(new Date()).format("DD MMM"),
        },
      },
    });
  }





  StateWiseData: any;
  getStateWiseData() {
    this.http.get("https://api.livecovid.in/api/state").subscribe((resp: any) => {
      this.StateWiseData = Object.entries(resp.statewise);
      this.previousStatesList = this.StateWiseData
    });
  }


  onSearchChange(ev) {
    const searchTerm = ev.srcElement.value;
    if (searchTerm == "") {
      this.StateWiseData = this.previousStatesList;
      return;
    }

    this.StateWiseData = this.StateWiseData.filter(item => {
      if (item[1].name && searchTerm) {
        if (item[1].name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

}
