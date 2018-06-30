import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  request:any;
  constructor() { }

  addLeave(request){
    console.log(request);
  }
}
