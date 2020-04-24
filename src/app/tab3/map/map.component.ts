import { Component, ViewChild, ElementRef } from "@angular/core";

import * as leaflet from "leaflet";
import { NavController, LoadingController } from "@ionic/angular";
import { DataService } from "src/app/services/data-services.service";
import { Map } from "leaflet";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent {
  @ViewChild("map", { static: true }) mapContainer: ElementRef;
  map: Map;
  locations: any;
  data: any;
  loader: any;
  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private loadCtrl: LoadingController,
    private api: DataService
  ) {
    
  }

  ngOnInit() {
    
    this.getData();
  }


  async loadmap() {
    this.loader.present()
    
    this.map = leaflet
      .map("map", { center: [20.0, 5.0], minZoom: 1, zoom: 2 })
    leaflet
      .tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: ["a", "b", "c"],
      })
      .addTo(this.map);
      this.data["locations"].forEach((location: any) => {
        
        
        leaflet.circle(
          [location.coordinates.latitude, location.coordinates.longitude],
          {
            color: "orangered",
            fillColor: "#FF000007",
            fillOpacity: 0.5,
            radius: location.latest.confirmed * 2
          }
        )
          .addTo(this.map)
          .bindPopup(
            `<b>Country</b>: ${location.country} <br/>
             <b>Latest data:</b> <br/>
            - Confirmed: ${location.latest.confirmed}<br/>
            - Recovered: ${location.latest.recovered}<br/>
            - Deaths: ${location.latest.deaths}<br/>
          `
          );
      });
      this.loader.dismiss();
  }

  async getData() {
    this.loader = await this.loadCtrl.create({
      message: "Loading...",
      spinner: "dots",
      animated: true,
    });
    this.loader.present();
    this.http
      .get("https://coronavirus-tracker-api.herokuapp.com/v2/locations")
      .subscribe((resp) => {
        this.data = resp;
        this.loadmap();
        // this.combineDataWithSameName(this.data)
        this.loader.dismiss();

      });
  }

  // combineDataWithSameName(data) {
  //   let country = {name: "" , confirmed: 0 , recovered: 0 , deaths: 0};
  //   var output = [];
    
  //   data["locations"].reduce((output, invoice) => {
  //     var name = invoice.country
  //     var confirmed = +invoice.latest.confirmed;
  //     var recovered = +invoice.latest.recovered;
  //     var deaths = +invoice.latest.deaths;
  //     country.name = name;
  //     country.confirmed = confirmed;
  //     country.deaths = deaths;
  //     country.recovered = recovered;
  //     output.push(country)
  //     return output
  //   }, {})

  //   console.log(output);
    
  // }
}
