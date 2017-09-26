import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { SavedlocationsService } from '../../services/savedlocations.service';
import { NotificationsService } from 'angular2-notifications';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  locations: string[];
  reports: Report[];
  isEdit: boolean = false;
  editText: string = "edit";
  private sub: any;
  
  @Output()
  changeWeather: EventEmitter<any> = new EventEmitter<any>();

  // notification defaults
  public options = {
    position: ["top", "right"],
    timeOut: 3000,
    pauseOnHover: true,
    lastOnBottom: true
  }

  constructor(private weatherService:WeatherService, 
              private savedLocationsService:SavedlocationsService,
              private notificationsService: NotificationsService,
              private router: Router
            ) { }

  ngOnInit() {

    if (sessionStorage.userloggedin) {
      sessionStorage.removeItem('userloggedin');
      let ns = this.notificationsService;
      setTimeout(function() {
        ns.success("Success", "You are now logged in!", this.options);
      }, 30);
    }

    this.getSavedLocations();
  }

  getSavedLocations() {
    this.locations = this.savedLocationsService.getSavedLocations();
    this.getWeather();
  }

  getWeather() {
    // make one service call for each element in the 'locations' array
    Observable.forkJoin(this.locations
      .map((element) => this.weatherService.getWeather(element)))
      .subscribe(
        (data) => this.reports = data
    );
  }

  getDetails(location) {
    this.router.navigate(['/weather', location]);
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    this.editText = (this.isEdit == true) ? "exit edit" : "edit";
    return false;
  }

  deleteTile(location) {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      this.savedLocationsService.deleteSavedLocation(location, user.id).subscribe((data) => {
        // set the new locations into session storage
        let updatedlocations = data.model.locations;
        let updateduser = JSON.parse(localStorage.user);
        updateduser.locations = updatedlocations;
        localStorage.setItem("user", JSON.stringify(updateduser));
        this.getSavedLocations();
      });
    }else {
      console.log('Error removing tile');
    }
    return false;
  }

  clearAll() {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      this.savedLocationsService.deleteAllSavedLocations(user.id).subscribe(() => {
        this.reports = [];
        // clear the locations from session storage
        let updateduser = JSON.parse(localStorage.user);
        updateduser.locations = [];
        localStorage.setItem("user", JSON.stringify(updateduser));
      });
    }else {
      console.log('Error clearing locations');
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
