import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import { NotificationsService } from 'angular2-notifications';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  // notification defaults
  public options = {
    position: ["top", "right"],
    timeOut: 5000,
    pauseOnHover: true,
    lastOnBottom: true
  }

  constructor(
    private validateService: ValidateService,
    private notificationsService: NotificationsService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }
  
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      locations: []
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.notificationsService.error("Error", "Please fill out all fields", this.options);
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.notificationsService.error("Error", "Please enter a valid email address", this.options);
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        sessionStorage.setItem('newregistereduser', 'true');
        this.router.navigate(['/login']);
      } else {
        this.notificationsService.error("Error", "Registration error", this.options);
        this.router.navigate(['/register']);
      }
    });

  }

}
