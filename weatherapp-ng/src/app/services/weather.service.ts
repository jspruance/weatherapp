import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  appid:string = "&appid=fd61eab401147e78b825c2f71cdea941";
  weatherurl:string = "http://api.openweathermap.org/data/2.5/weather";
  forecasturl:string = "http://api.openweathermap.org/data/2.5/forecast";
  iconclass:string;
  
  constructor(public http:Http) { 
    console.log('weather service connected...');
  }

  setQueryPrefix(location) {
    let queryPrefix = "?q=";
    let isnum = /^\d+$/.test(location);
    if(isnum === true) {
      queryPrefix = "?zip=";
    }
    return queryPrefix;
  }

  getWeather(location) {
    let queryPrefix = this.setQueryPrefix(location);
    let url = this.weatherurl + queryPrefix + location + this.appid;
    return this.http.get(url).map(res => res.json());
  }

  getForecast(location) {
    let queryPrefix = this.setQueryPrefix(location);
    let url = this.forecasturl + queryPrefix + location + this.appid;
    return this.http.get(url).map(res => res.json());
  }

}
