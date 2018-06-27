import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;

  constructor(
    private authService:AuthService,
    private flashMessage:NgFlashMessageService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  registerData(){
    const user = {
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }
    this.authService.registerUser(user).subscribe(res=>{
      if(res.state){
        this.flashMessage.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["You're registered"], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: false,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'success'
        });
        this.router.navigate(['/login']);

      }
      else{
        this.flashMessage.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Somthing went wrong"], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: false,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'danger'
        });
        this.router.navigate(['/register'])
      }
    });
  }

}
