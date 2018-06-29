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


const applicationRoutes:Routes =[
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'profile', component:ProfileComponent},
  // { path:'profile', component:ProfileComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(applicationRoutes),
    FormsModule,
    HttpModule,
    NgFlashMessagesModule.forRoot()

  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
