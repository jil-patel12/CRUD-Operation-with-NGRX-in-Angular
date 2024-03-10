import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/views/product/interfaces/product.interface';

export const LoadProducts = createAction('[Products] Load Products');

export const LoadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

export const LoadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: any }>());

export const AddProduct = createAction(
  '[Products] Add Products',
  props<{ product: Product }>()
);

export const UpdateProduct = createAction(
  '[Products] Update Products',
  props<{ product: Update<Product> }>()
);

export const DeleteProduct = createAction(
  '[Products] Delete Products',
  props<{ productId: string }>()
);