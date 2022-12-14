import { Component, Inject, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut,expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'diaplay:block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dish:Dish;
  dishErrMess:string;
  promotion:Promotion;
  promoErrMess:string;
  leader:Leader;
  leaderErrMess:string;

  constructor(private dishService:DishService,
     private promotionService:PromotionService, 
     private leaderService:LeaderService,
     @Inject('BaseURL')private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(dish =>this.dish = dish,
      errMess => this.dishErrMess = <any>errMess);
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
      errMess => this.promoErrMess = <any>errMess);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader,
      errMess => this.leaderErrMess = <any>errMess);
  }

}
