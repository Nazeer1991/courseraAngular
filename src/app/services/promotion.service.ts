import { Injectable } from '@angular/core';
import {Promotion } from '../shared/promotion'
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable,of } from 'rxjs';
import { delay, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions');
  }

  getPromotion(id: string):Observable<Promotion>{
    return this.http.get<Promotion>(baseURL +'dishes/' +id);
  }

  getFeaturedPromotion():Observable<Promotion>{
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
    .pipe(map(promotions =>promotions[0]))
    
  }
}
