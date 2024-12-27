import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommanServiceService {
private navigate = new Subject<string>();

callfunction$ = this.navigate.asObservable();

tiggerfunction(value:any){
  this.navigate.next(value);
}

  constructor() { }
}
