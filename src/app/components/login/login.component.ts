import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  // notification defaults
  public options = {
    position: ["top", "right"],
    timeOut: 4000,
    pauseOnHover: true,
    lastOnBottom: true
  }

  constructor(private notificationsService: NotificationsService,
              private authService: AuthService,
              private router: Router
             ) { }
  
  ngOnInit() {
    
    if (sessionStorage.newregistereduser) {
      sessionStorage.removeItem('newregistereduser');
      let ns = this.notificationsService;
      setTimeout(function() {
        ns.success("Success", "You are now registered!", this.options);
      }, 30);
    }

  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        sessionStorage.setItem('userloggedin', 'true');
        this.router.navigate(['/dashboard']);
      }else {
        this.notificationsService.error("Error", data.msg, this.options);
      }
    });

  }

}
