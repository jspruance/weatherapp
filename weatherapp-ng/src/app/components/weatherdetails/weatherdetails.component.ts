import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { SavedlocationsService } from '../../services/savedlocations.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit {

  location:string;
  report:Report;

  // notification defaults
  public options = {
    position: ["top", "right"],
    timeOut: 2000,
    lastOnBottom: true
  }

  constructor(private weatherService:WeatherService,
              private savedLocationsService:SavedlocationsService,
              private notificationsService: NotificationsService
            ) { }

  ngOnInit() {
  }

  updateWeather(event) {
    this.report = event;
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

  convertTemp(temp) {
    return Math.ceil((9/5*(temp  - 273))+32) + String.fromCharCode(176) + "F" + " / " + Math.ceil(temp - 273.15) + String.fromCharCode(176) + "C";
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