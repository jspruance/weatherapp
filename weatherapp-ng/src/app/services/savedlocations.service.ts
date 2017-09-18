import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class SavedlocationsService {

  constructor(private http:Http) { }

  getSavedLocations() {
    let locations = [];
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      return user.locations;
    }else{
      return [];
    }
  }

  addSavedLocation(location, userid) {
    let user = {
      "location": location,
      "userid": userid
    }
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/addlocation', user, {headers: headers})
    .map(res => res.json());
  }

  deleteSavedLocation(location, userid) {
    let user = {
      "location": location,
      "userid": userid
    }
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/removelocation', user, {headers: headers})
    .map(res => res.json());
  }

  deleteAllSavedLocations(userid) {
    let user = {"userid": userid}
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/removealllocations', user, {headers: headers})
    .map(res => res.json());
  }

}