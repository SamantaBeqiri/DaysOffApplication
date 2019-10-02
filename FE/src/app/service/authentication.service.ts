import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders }  from '@angular/common/http';
import { map, tap, flatMap } from 'rxjs/operators';
import { CrudService } from './crud.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user= new BehaviorSubject<User>(this.getUserFromLs()); 
  constructor(private httpClient:HttpClient,private crudService:CrudService,private router: Router) { }

  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate',{username,password}).pipe(
      tap((x)=>this.saveToken(x)),
      flatMap((token)=>this.crudService.getUserByUsername(username)),
      tap((user)=>sessionStorage.setItem('user',JSON.stringify(user))),
      tap((user)=>this.user.next(user))
      );
  }

  saveToken({token}){
    sessionStorage.setItem('token', `Bearer ${token}`);
  }
  isUserLoggedIn() {
  
    return true;
  }

  getUser():Observable<User>{
   return this.user.asObservable();
  }

  isAdmin(){
    return this.getUser().pipe(
      map(user => user && user.role === 'ROLE_ADMIN')
    );
  }
 
  getUserName(){
    return this.getUser().pipe(
      map(user=>user.name)
    )
  }
  getUserFromLs():User{
    return JSON.parse(sessionStorage.getItem('user'))
  }

  logout(){
   sessionStorage.removeItem('token');
   sessionStorage.removeItem('user')
   this.router.navigateByUrl("/login")

  }


}

