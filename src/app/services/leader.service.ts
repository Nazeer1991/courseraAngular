import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Leader } from '../shared/leader';
import { delay,map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient) { }
  getLeaders():Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership');
  }
  getLeader(id:string):Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership/' + id);  
  }
  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
    .pipe(map(leaders => leaders[0]))
  }
}
