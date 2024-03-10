import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "../reducers/product.reducer";
import { selectAll } from "../reducers/product.reducer";

export const ProductFeatureSelector = createFeatureSelector<ProductState>('products');

export const getAllProducts = createSelector(
    ProductFeatureSelector,
    selectAll
);

export const areProductLoaded = createSelector(
    ProductFeatureSelector,
    state => state.loaded
);