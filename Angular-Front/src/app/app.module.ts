import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthService } from './service/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './service/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeaveComponent } from './components/leave/leave.component';
import { LeaveService } from './service/leave.service'


const applicationRoutes:Routes =[
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'profile', component:ProfileComponent},
  { path: 'dashboard', component:DashboardComponent},
  { path: 'leave', component:LeaveComponent}
  // { path:'profile', component:ProfileComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    LeaveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(applicationRoutes),
    FormsModule,
    HttpModule,
    NgFlashMessagesModule.forRoot()

  ],
  providers: [AuthService, AuthGuard, LeaveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
