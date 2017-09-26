import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes }   from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SubnavComponent } from './components/subnav/subnav.component';

import { WeatherService } from './services/weather.service';
import { SavedlocationsService } from './services/savedlocations.service';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { DateService } from './services/date.service';
import { AuthGuard } from './guards/auth.guard';
import { WeatherdetailsComponent } from './components/weatherdetails/weatherdetails.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent, 
    canActivate:[AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent, 
    canActivate:[AuthGuard]
  },
  {
    path: 'weather',
    component: WeatherdetailsComponent
  },
  {
    path: 'weather/:location',
    component: WeatherdetailsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    SubnavComponent,
    WeatherdetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WeatherService,SavedlocationsService,ValidateService,AuthService,AuthGuard,DateService],
  bootstrap: [AppComponent]
})

export class AppModule { }