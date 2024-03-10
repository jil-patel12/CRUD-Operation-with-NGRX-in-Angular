import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/views/product/interfaces/product.interface";
import * as ProductActions from '../actions/product.action';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface ProductState extends EntityState<Product> {
    loaded: boolean;
    isloading: boolean;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState = adapter.getInitialState({
    loaded: false,
    isloading: false
});


export const ProductReducer = createReducer(
    initialState,
    on(ProductActions.LoadProducts, (state) => ({ ...state, isloading: true })),
    on(ProductActions.LoadProductsSuccess, (state, action) => {
        return adapter.setAll(action.products, { ...state, isloading: false, loaded: true });
    }),
    on(ProductActions.LoadProductsFailure, (state, action) => {
        return adapter.setAll(action.error, { ...state, isloading: false, loaded: true });
    }),
    on(ProductActions.AddProduct, (state, action) => {
        return adapter.addOne(action.product, state);
    }),
    on(ProductActions.UpdateProduct, (state, action) => {
        return adapter.updateOne(action.product, state);
    }),
    on(ProductActions.DeleteProduct, (state, action) => {
        return adapter.removeOne(action.productId, state);
    })
);

export const { selectAll, selectIds } = adapter.getSelectors();