import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { StoreModule } from '@ngrx/store';
import { ProductReducer } from 'src/app/store/reducers/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from 'src/app/store/effects/product.effects';
import { ProductService } from 'src/app/core/services/product/product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    StoreModule.forFeature('products', ProductReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [ProductService]
})
export class ProductModule { }
