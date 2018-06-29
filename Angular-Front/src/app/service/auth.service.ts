import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any;
  authtoken:any;

  constructor(
    private http:Http,
    // public jwtHelper: JwtHelperService
  ) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post("http://localhost:3000/users/register",user,{headers:headers}).pipe(map(res=>res.json())) ;
  };

  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post("http://localhost:3000/users/login",user,{headers:headers}).pipe(map(res=>res.json())) ;
  
  };

  storeData(token, userdata){
    localStorage.setItem("tokenid", token);
    localStorage.setItem("user", JSON.stringify(userdata));
    this.authtoken = token;
    this.user = userdata;

  };

  getProfile(){
    this.fetchToken();

    let headers = new Headers();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/users/profile",{headers:headers}).pipe(map(res=>res.json())) ;
  }

  fetchToken(){
    const token = localStorage.getItem("tokenid");
    this.authtoken = token;
  }

  logout(){
    this.authtoken=null;
    this.user=null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired();
  }

  // loggedIn(){
  //   return this.jwtHelper.isTokenExpired();
  // }
}
