import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommanServiceService {
private navigate = new Subject<string>();

callfunction$ = this.navigate.asObservable();

tiggerfunction(value:any){
  this.navigate.next(value);
}

  constructor(private http:HttpClient) { }

  getdata():Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/data");
  }
}
