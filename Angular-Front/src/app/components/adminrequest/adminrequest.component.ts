import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../service/leave.service';

@Component({
  selector: 'app-adminrequest',
  templateUrl: './adminrequest.component.html',
  styleUrls: ['./adminrequest.component.css']
})
export class AdminrequestComponent implements OnInit {
  AllStatus: any=[];
  constructor(
    private leaveService: LeaveService
  ) { }

  ngOnInit() {
    this.leaveService.showAllPendings().subscribe(result=>{
      this.AllStatus=result;
      console.log(this.AllStatus);
    });
  }

}
