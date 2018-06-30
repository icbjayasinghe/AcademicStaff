import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  request:any;
  constructor(
    private http:Http,
  ) { }

  addLeave(request){
    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post("http://localhost:3000/users/request",request,{headers:headers}).pipe(map(res=>res.json())) ;
  }
}
