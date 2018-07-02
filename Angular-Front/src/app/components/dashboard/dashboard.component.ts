import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../service/leave.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  AllStatus: any=[];

  id : Number;
 
  constructor(
    private leaveService:LeaveService
  ) { }

  ngOnInit() {
    this.leaveService.showPendings().subscribe(result=>{
      this.AllStatus=result;
      console.log(this.AllStatus);
    });
  }

  delete(id,index){
    this.leaveService.deleteMyRequest(id).subscribe(result=>{
      if(result.status){
        this.AllStatus.splice(index,1);
      }
    });


  }

  

}
