import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Subject, Subscription, debounceTime, map } from 'rxjs';
import { getAllProducts } from 'src/app/store/selectors/product.selector';
import { Update } from '@ngrx/entity';
import * as ProductActions from 'src/app/store/actions/product.action';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  loader: boolean = true;
  productId: string = '';
  productDetails: Product = {};
  quantity: number = 0;
  quantityChanged: Subject<number> = new Subject();
  subscription!: Subscription;
  debounceSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['productId'];
    });

    if (this.productId && this.productId.length > 0) {
      this.subscription = this.store.select(getAllProducts).pipe(
        map((productList) => productList.find((product) => product.id == this.productId))
      ).subscribe((product) => {
        this.productDetails = product!;
        this.quantity = this.productDetails.quantity!;
      });

      this.debounceRequest();
      this.loader = false;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.debounceSubscription) {
      this.debounceSubscription.unsubscribe();
    }
  }

  decreaseQuantity() {
    this.quantity = this.quantity - 1;
    this.quantityChanged.next(this.quantity);
  }

  increaseQuantity() {
    this.quantity = this.quantity + 1;
    this.quantityChanged.next(this.quantity);
  }

  debounceRequest() {
    this.debounceSubscription = this.quantityChanged.pipe(debounceTime(1500)).subscribe((quantity) => {
      let product: Update<Product> = {
        id: this.productDetails.id!,
        changes: {
          ...this.productDetails,
          quantity: quantity
        }
      }

      this.store.dispatch(ProductActions.UpdateProduct({ product }));
    });
  }

}
