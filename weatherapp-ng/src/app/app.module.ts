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

import { WeatherService } from './services/weather.service';
import { SavedlocationsService } from './services/savedlocations.service';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { SubnavComponent } from './components/subnav/subnav.component';
import { AuthGuard } from './guards/auth.guard';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
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
    path: 'search',
    component: SearchComponent
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
    SubnavComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WeatherService,SavedlocationsService,ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }