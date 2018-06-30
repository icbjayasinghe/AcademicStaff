import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../service/leave.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  email:String;
  sdate:String;
  edate:String;
  reason:String;
  address:String;
  mobile:String;

  // email:String;
  constructor(
    private leaveService:LeaveService,
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  leaveRequest(){
    this.authService.getProfile().subscribe(res=>{
      this.email= res.data.email;
    });
    const request = {
      email:this.email,
      sdate:this.sdate,
      edate:this.edate,
      reason:this.reason,
      address:this.address,
      mobile:this.mobile
    };
    this.leaveService.addLeave(request)
  }

}
