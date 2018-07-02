import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../service/auth.service';

import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String;
  password:String;
  constructor(
    private authService:AuthService,
    private flashMessage:NgFlashMessageService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  loginUser(){
    const user = {
      email:this.email,
      password:this.password
    }
    this.authService.loginUser(user).subscribe(res=>{
      if(res.state){
        const type= res.user["type"];
        // console.log(type);
        this.authService.storeData(res.token, res.user);
        this.flashMessage.showFlashMessage({
          messages: ["You're loggedin"], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: 4000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'success'
        });
        if(type=="staff"){
          this.router.navigate(['/dashboard']);
        }
        if(type=="admin"){
          this.router.navigate(['/admindash']);
        }
        
      }
      else{
        this.flashMessage.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Somthing went wrong"], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: 4000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'danger'
        });
        this.router.navigate(['/login']);
      }
    });

  }

}
