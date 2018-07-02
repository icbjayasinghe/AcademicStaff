import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { leave } from '@angular/core/src/profile/wtf_impl';



@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  request:any;

  id:any;
  constructor(
    private http:Http,
    private authService: AuthService
  ) { }

  addLeave(request){
    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post("http://localhost:3000/users/request",request,{headers:headers}).pipe(map(res=>res.json())) ;
  }

  showPendings(){
    const user= JSON.parse(localStorage.getItem("user"));
    const url = "http://localhost:3000/users/myrequest/"+user.email;
    return this.http.get(url).pipe(map(res=>res.json()));
  }

  showAllPendings(){
    const url = "http://localhost:3000/admin/allrequest"
    return this.http.get(url).pipe(map(res=>res.json()));
  }

  deleteMyRequest(id){
    const url = "http://localhost:3000/users/myrequestdelete/"+id;
    return this.http.delete(url).pipe(map(res=>res.json()));
  }
}
