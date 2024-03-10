import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from 'src/app/core/services/product/product.service';
import * as ProductActions from '../actions/product.action';
import { catchError, concatMap, map, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ProductEffects {

    constructor(
        private action$: Actions,
        private productService: ProductService,
        private router: Router
    ) { }

    loadProducts$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductActions.LoadProducts),
            concatMap(() => this.productService.getAllProducts()),
            map(products => ProductActions.LoadProductsSuccess({ products: products })),
            catchError((error) => of(ProductActions.LoadProductsFailure({ error })))
        )
    );

    createProduct$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductActions.AddProduct),
            concatMap((action) => this.productService.createProduct(action.product)),
            tap(() => this.router.navigateByUrl('/products'))
        ),
        { dispatch: false }
    );

    updateProduct$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductActions.UpdateProduct),
            concatMap((action) => this.productService.updateProduct(action.product.id, action.product.changes))
        ),
        { dispatch: false }
    );

    deleteProduct$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductActions.DeleteProduct),
            concatMap((action) => this.productService.deleteProduct(action.productId))
        ),
        { dispatch: false }
    );
}