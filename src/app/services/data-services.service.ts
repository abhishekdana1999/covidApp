import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { cities } from '../data/country';

@Injectable()
export class DataService {

    isCookieAccepted = false;
    private httpOptions: any;

    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
    }

    getData()  {
        const requestURL = 'https://api.covid19api.com/summary';
        return this.http.get(requestURL, this.httpOptions);
    }

    
  getDataForCountry(countryname) {
    const requestURL = `https://api.covid19api.com/total/country/${countryname}?from=2020-01-22T00:00:00Z&to=${new Date().toUTCString()}`;
    return this.http.get(requestURL, this.httpOptions);
  }

  getDataForCountryFromTo() {
    const requestURL = `https://api.covid19api.com/world?from=2020-01-22T00:00:00Z&to=${new Date().toUTCString()}`;
    return this.http.get(requestURL, this.httpOptions);
  }

  getCountriesName() {
    const data = cities
    return data
  }


  getLocations() {
    const requestURL = `https://api.covid19api.com/all`;
    return this.http.get(requestURL , this.httpOptions)
  }

}