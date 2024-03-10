import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Product } from '../interfaces/product.interface';
import * as ProductActions from 'src/app/store/actions/product.action';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
  }

  addProduct(product:Product){
    this.store.dispatch(ProductActions.AddProduct({product}));
  }
}
