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

import { AuthService } from './service/auth.service'

const applicationRoutes:Routes =[
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(applicationRoutes),
    FormsModule,
    HttpModule,
    NgFlashMessagesModule.forRoot()

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
