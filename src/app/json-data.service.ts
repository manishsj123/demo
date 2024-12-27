import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {

  constructor(private http:HttpClient) {}

  getdata(){
    return this.http.get('http://localhost:3000/posts');
  }

  setdata(data:any){
    return this.http.post('http://localhost:3000/posts',data);
  }

  delete(id:any){
    return this.http.delete('http://localhost:3000/posts/'+id)
  }

  update(data:any){
    return this.http.put('http://localhost:3000/posts/'+data.id,data);
  }
}
