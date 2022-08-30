import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import { DishService } from '../services/dish.service';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {switchMap} from 'rxjs/operators';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

 

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') commentFormDirective;
    dish:Dish;
   dishCopy:Dish;
    errMess: string;
    dishIds: string[];
    prev:string;
    next:string; 
    commentForm:FormGroup;
    comment:Comment;

  constructor(private dishService:DishService, private location:Location, 
    private route:ActivatedRoute,
    private fb: FormBuilder,
    @Inject('BaseURL')private BaseURL) { 
    this.createForm()
  }

  ngOnInit() {
    this.dishService.getDishIds()
    .subscribe((dishIds)=>this.dishIds = dishIds);
    this.route.params
    .pipe(switchMap((params: Params)=>this.dishService.getDish(params['id'])))
    .subscribe(dish=>{this.dish = dish;this.dishCopy = dish; this.setPrevNext(dish.id)},
    errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId:string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }
  createForm(){
    this.commentForm = this.fb.group({
      author:['',Validators.required,Validators.minLength(2),Validators.maxLength(25)],
      rating:'',
      comment:['',Validators.required],
    })
    
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onSubmit(){
  
    this.commentForm.value.date=(new Date()).toISOString();
   this.dish.comments.push(this.commentForm.value);
   
   this.dishService.putDish(this.dishCopy)
   .subscribe(dish => {
    this.dish = dish;
    this.dishCopy = dish;
   },
   errmess => {this.dish = null; this.dishCopy = null ;this.errMess = <any>errmess})
    this.commentFormDirective.resetForm();
  }

  formErrors = {
    'author':'',
    'comment':''
  }
  validationMessages = {
    'author':{
      'required': 'Author Name is required',
      'minlength':'Author Name must be atleast 2 characters long',
      'maxlength':'Author Name cannot be more than 25 characters long'
    },
    'comment':{
      'required':'Please enter comment.'
    }
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
