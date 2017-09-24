import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  appid:string = "&appid=fd61eab401147e78b825c2f71cdea941";
  resturl:string = "http://api.openweathermap.org/data/2.5/weather";
  iconclass:string;

  constructor(public http:Http) { 
    console.log('weather service connected...');
  }

  getWeather(location) {
    let queryPrefix = "?q=";
    let isnum = /^\d+$/.test(location);
    if(isnum === true) {
      queryPrefix = "?zip=";
    }
    let url = this.resturl + queryPrefix + location + this.appid;
    return this.http.get(url).map(res => res.json());
  }

}
