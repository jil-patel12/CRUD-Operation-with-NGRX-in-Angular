import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Product } from '../interfaces/product.interface';
import { getAllProducts } from 'src/app/store/selectors/product.selector';
import { Subscription, map } from 'rxjs';
import * as ProductActions from 'src/app/store/actions/product.action';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  loader: boolean = true;
  productId: string = '';
  editProductData: Product = {};
  subscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['productId'];
    })

    if (this.productId && this.productId.length > 0) {
      this.subscription = this.store.select(getAllProducts).pipe(
        map((productList) => productList.find((product) => product.id == this.productId))
      ).subscribe((product) => {
        this.editProductData = product!;
      });

      this.loader = false;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateProduct(updateProduct: Product) {
    let product: Update<Product> = {
      id: updateProduct.id!,
      changes: {
        ...updateProduct
      }
    }

    this.store.dispatch(ProductActions.UpdateProduct({ product }));
    this.router.navigateByUrl('/products');
  }

}
