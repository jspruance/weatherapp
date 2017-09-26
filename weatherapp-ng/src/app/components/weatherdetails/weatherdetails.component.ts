import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { SavedlocationsService } from '../../services/savedlocations.service';
import { DateService } from '../../services/date.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit {

  location:string;
  report:Report;
  forecastReport:ForecastReport;
  date: String;

  // notification defaults
  public options = {
    position: ["top", "right"],
    timeOut: 2000,
    lastOnBottom: true
  }

  constructor(private weatherService:WeatherService,
              private savedLocationsService:SavedlocationsService,
              private notificationsService: NotificationsService,
              private dateService: DateService
            ) { }

  ngOnInit() {
    this.date = this.dateService.getDayAndTime();
  }

  updateWeather(event) {
    this.report = event;
  };

  updateForecast(event) {

    let data = event;
    let fiveDayArray = [[],[],[],[],[],[],[]];
    let weekArry = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let hourArry = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

    let dt = new Date();
    let dtoday = dt.getDay();

    let resultArray = [];

    // populte fiveDayArray with reports by day for further processing
    data.list.forEach(function(forecast){
      let d = new Date(forecast.dt * 1000);
      let day = d.getDay();
      let hour = d.getHours();
      
      // filter out any forecasts for today and order the rest by day
      if (day != dtoday) {
        // convert dt to day value
        forecast.day = weekArry[day];
        forecast.hour = hourArry[hour];
        forecast.hourMil = hour;
        fiveDayArray[day].push(forecast);
      }
      
    });
    
    fiveDayArray.forEach(function(forecastgroup){

      let thisForecast = { "day":"", "hi":0, "lo":0,"description":""};
      
      let hitemp = -999;
      let lotemp = 999;

      if(forecastgroup.length > 0) {
        // inner loop - iterate forecasts for a particular day
        forecastgroup.forEach(function(forecast) {

          // get description for midday forecast
          if(forecast.hourMil > 10 && forecast.hourMil < 14) {
            thisForecast.description = forecast.weather[0].description;
            thisForecast.day = forecast.day;
          }

          // set day's hi temp
          if (forecast.main.temp_max > hitemp) {
            hitemp = forecast.main.temp_max;
          }

          // set day's lo temp
          if (forecast.main.temp_min < lotemp) {
            lotemp = forecast.main.temp_min;
          }

        });

        thisForecast.hi = hitemp;
        thisForecast.lo = lotemp;

        // push the final 'combned' forecast for each day to the results array
        resultArray.push(thisForecast);

      }

    });

    // set the results in the class property for binding
    data.list = resultArray;
    this.forecastReport = data;
  };

  addToSavedLocations(location) {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      this.savedLocationsService.addSavedLocation(location, user.id).subscribe((data) => {
        // set the new locations into session storage
        let updatedlocations = data.model.locations;
        let updateduser = JSON.parse(localStorage.user);
        updateduser.locations = updatedlocations;
        localStorage.setItem("user", JSON.stringify(updateduser));
        // alert user of success
        this.notificationsService.success("Success", "Location saved to dashboard", this.options);
      });
      
    }else {
      // alert user of error
      this.notificationsService.error("Error", "Please log in or register in order to save a location.", this.options);
    }
    return false;
  }

  convertTemp(temp, scale, nosign) {
    if (scale == "C") {
      let S = (nosign) ? "" : "C";
      Math.ceil(temp - 273.15) + String.fromCharCode(176) + S;
    }else {
      let S = (nosign) ? "" : "F";
      return Math.ceil((9/5*(temp  - 273))+32) + String.fromCharCode(176) + S;
    }
    
  }

  removeWhitespace(str) {
    return str.replace(" ", "");
  }

}

interface Report{
  name:string,
  temp:number,
  conditions:string
}

interface ForecastReport{
  list:any
}