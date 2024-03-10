import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductResolver } from './views/product/resolvers/product.resolver';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers,{
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([])
  ],
  providers: [ProductResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
