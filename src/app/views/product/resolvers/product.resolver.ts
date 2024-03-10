import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable, filter, first, tap } from "rxjs";
import { LoadProducts } from "src/app/store/actions/product.action";
import { AppState } from "src/app/store/reducers";
import { areProductLoaded } from "src/app/store/selectors/product.selector";

@Injectable()
export class ProductResolver implements Resolve<Observable<any>>{

    constructor(private store: Store<AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
        return this.store.pipe(
            select(areProductLoaded),
            tap((ProductLoaded) => {
                if (!ProductLoaded) {
                    this.store.dispatch(LoadProducts())
                }
            }),
            filter(productLoaded => productLoaded),
            first()
        );
    }
}