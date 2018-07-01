import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LeaveService } from '../../service/leave.service';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router'


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  email:String;
  leaveCat:String;
  sdate:String;
  edate:String;
  reason:String;
  address:String;
  mobile:String;

  // email:String;
  constructor(
    private leaveService:LeaveService,
    private authService:AuthService,
    private activatedRouter:ActivatedRoute,
    private flashMessage:NgFlashMessageService,
    private router:Router
  ) { 
    activatedRouter.params.subscribe(params=>{
      this.leaveCat=params.LeaveCat;
    });
    this.authService.getProfile().subscribe(res=>{
      this.email= res.data.email;
    });
  }

  ngOnInit() {
  }

  leaveRequest(){
    
    const request = {
      email:this.email,
      leaveCat:this.leaveCat,
      status:"pending",
      sdate:this.sdate,
      edate:this.edate,
      reason:this.reason,
      address:this.address,
      mobile:this.mobile
    };
    this.leaveService.addLeave(request).subscribe(res=>{
      if(res.state){
        this.flashMessage.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Successfully requested.."], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: 4000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'success'
        });
        this.router.navigate(['/dashboard']);
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
        this.router.navigate(['/dashboard']);

      }
      
    })
  }

}
