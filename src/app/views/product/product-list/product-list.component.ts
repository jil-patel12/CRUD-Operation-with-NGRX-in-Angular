import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, debounceTime, map } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { getAllProducts } from 'src/app/store/selectors/product.selector';
import * as ProductActions from 'src/app/store/actions/product.action';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  productList$: Observable<Product[]> = new Observable<Product[]>();
  productFiltered$: Observable<Product[]> = new Observable<Product[]>();
  search: string = '';
  searchSubject: Subject<string> = new Subject();
  debounceSubscription!: Subscription;
  subscription!: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.productList$ = this.store.select(getAllProducts);
    this.productFiltered$ = this.productList$;

    this.debounceRequest();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.debounceSubscription) {
      this.debounceSubscription.unsubscribe();
    }
  }

  deleteProduct(productId: string) {
    this.store.dispatch(ProductActions.DeleteProduct({ productId }));
  }

  searchInputChange() {
    this.searchSubject.next(this.search);
  }

  debounceRequest() {
    this.debounceSubscription = this.searchSubject.pipe(debounceTime(1000)).subscribe((search) => {
      this.productFiltered$ = this.productList$.pipe(
        map((productList) => productList.filter((product) => {
          return product['name']?.toLocaleLowerCase().includes(search);
        }))
      );
    });
  }

}