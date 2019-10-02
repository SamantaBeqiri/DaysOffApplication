import { Injectable } from '@angular/core';
import { Application } from '../models/Application';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from '../models/User';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
appUrl='http://localhost:8080/api/application';
userUrl='http://localhost:8080/api/user';
  constructor(private http: HttpClient) { }

  create(application:Application): Observable<Application>{
    console.log("called")
    return this.http.post<Application>(this.appUrl, application);
  }


  getAllApplication(): Observable<Application[]> {
    return this.http.get<Application[]>(this.appUrl);
}
delete(id: string): Observable<any> {
  return this.http.delete<any>(`${this.appUrl}/${id}`);
}
update(application:Application): Observable<Application>{
  return this.http.put<Application>(this.appUrl + `/${application.id}`, application);
}

getUserByUsername(username:string ):Observable<User>{
  let params=new HttpParams().set('username',username);

  return this.http.get<User>(this.userUrl,{params})
}

approve(id:string,application:Application):Observable<Application>{
  return this.http.put<Application>(this.appUrl+`/approve/${id}`,application)
}

reject(id:string):Observable<Application>{
  return this.http.put<Application>(this.appUrl+ `/reject/${id}`,null)
}

getUsers():Observable<User[]>{
  return this.http.get<User[]>(this.userUrl+`/get`)
}
deleteUser(id:string):Observable<User>{
  return this.http.delete<User>(this.userUrl+`/${id}`)
}
addUser(user:User):Observable<User>{
 return this.http.post<User>(this.userUrl,user)
}
updateUser(user:User):Observable<User>{
  return this.http.put<User>(this.userUrl,user)
}

}
