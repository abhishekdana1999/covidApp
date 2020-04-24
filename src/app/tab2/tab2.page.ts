import { Component, ViewChild } from "@angular/core";
import { DataService } from "../services/data-services.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { Chart } from "chart.js";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  @ViewChild("barChart", null) barChart: any;
  @ViewChild("ConfirmedChart", null) ConfirmedChart: any;
  @ViewChild("DeathChart", null) DeathChart: any;
  @ViewChild("RecoveredChart", null) RecoveredChart: any;
  @ViewChild("horizontalBar", null) horizontalBarChart: any;
  @ViewChild("line2", null) line2Chart: any;

  bars: any;
  horizontalBar: any;
  lines: any;
  line2: any;
  colorArray: any;
  data: any;
  isSaving = false;
  global: any;
  cities: any;
  tabledata: any;
  
  Top5CountryWithHighestConfirmedCases = []
  Top5CountryWithHighestDeathCases = []
  Top5CountryWithHighestRecoveredCases = []
  constructor(
    private appService: DataService,
    private alert: AlertController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getData();
    this.cities = this.appService.getCountriesName();
    Chart.defaults.global.defaultFontFamily = "Ubuntu";
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
      mode: "ios",
      duration: 10000,
    });

    await loading.present();
    this.appService.getData().subscribe(
      (res) => {
        
        this.data = res;
        this.global = this.data["Global"];
        this.tabledata = this.data["Countries"];
        this.Top5CountryWithHighestConfirmedCases = this.tabledata.sort((a, b) => { return a.TotalConfirmed < b.TotalConfirmed ? 1 : -1; })
        .slice(0, 5);
        this.Top5CountryWithHighestDeathCases = this.tabledata.sort((a, b) => { return a.TotalDeaths < b.TotalDeaths ? 1 : -1; })
        .slice(0, 5);

        this.Top5CountryWithHighestRecoveredCases = this.tabledata.sort((a, b) => { return a.TotalRecovered < b.TotalRecovered ? 1 : -1; })
        .slice(0, 5);
        
        this.createBarChart();
        this.createHorizontalBarChart();
        this.createConfirmedChart();
        this.createDeathChart();
        this.createRecoveredChart();
        loading.dismiss();
      },
      (error) => {
        loading.dismiss();
      }
    );
  }

  

  createBarChart() {
    const newPerc = Math.floor(
      (this.global.NewConfirmed / this.global.TotalConfirmed) * 100
    );
    const recoverdPerc = Math.floor(
      (this.global.TotalRecovered / this.global.TotalConfirmed) * 100
    );
    const deathPerc = Math.floor(
      (this.global.TotalDeaths / this.global.TotalConfirmed) * 100
    );
    const activePerc = 100 - (recoverdPerc + deathPerc);
    this.bars = new Chart(this.barChart.nativeElement, {
      type: "bar",
      height: 600,
      data: {
        labels: [
          "Active(" + activePerc + "%)",
          "Recoverd(" + recoverdPerc + "%)",
          "Deaths (" + deathPerc + "%)",
          "New(" + newPerc + "%)",
        ],
        datasets: [
          {
            label: "Total Percentage value",
            data: [activePerc, recoverdPerc, deathPerc, newPerc],
            backgroundColor: ["#9C27B0", "#2196F3", "#00BCD4", "#4CAF50"],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  createHorizontalBarChart() {
    this.horizontalBar = new Chart(this.horizontalBarChart.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Cases", "Recovered", "Deaths"],
        datasets: [
          {
            data: [
              this.global.TotalConfirmed,
              this.global.TotalRecovered,
              this.global.TotalDeaths,
            ],
            backgroundColor: ["#f44336", "#03A9F4", "#4CAF50"],
          },
        ],
      },
    });
  }

  createConfirmedChart() {
   
    this.bars = new Chart(this.ConfirmedChart.nativeElement, {
      type: 'line',
      
      data: {
        labels: this.Top5CountryWithHighestConfirmedCases.map(item => item.Country.slice(0,8) + "..."),
        datasets: [{ 
          label: "Confirmed",
            data: this.Top5CountryWithHighestConfirmedCases.map(item => item.TotalConfirmed),
            borderColor: "#f44336",
            fill: false
          }, 
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Top 5 countries with highest confirm cases.'
        }
      }
    });
  }

  createDeathChart() {
   
    this.bars = new Chart(this.DeathChart.nativeElement, {
      type: 'line',
      
      data: {
        labels: this.Top5CountryWithHighestDeathCases.map(item => item.Country.slice(0,8) + "..."),
        datasets: [{ 
          label: "Death",
            data: this.Top5CountryWithHighestDeathCases.map(item => item.TotalConfirmed),
            borderColor: "#FFC107",
            fill: false
          }, 
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Top 5 countries with highest confirm cases.'
        }
      }
    });
  }

  createRecoveredChart() {
   
    this.bars = new Chart(this.RecoveredChart.nativeElement, {
      type: 'line',
      
      data: {
        labels: this.Top5CountryWithHighestRecoveredCases.map(item => item.Country.slice(0,8) + "..."),
        datasets: [{ 
          label: "Recovered",
            data: this.Top5CountryWithHighestRecoveredCases.map(item => item.TotalRecovered),
            borderColor: "#4CAF50",
            fill: false
          }, 
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Top 5 countries with highest recovered cases.'
        }
      }
    });
  }

  getTodayDate() {
    return new Date()
  }

  doRefresh(event) {
    this.data = [];
    this.global = [];
    this.getData();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
