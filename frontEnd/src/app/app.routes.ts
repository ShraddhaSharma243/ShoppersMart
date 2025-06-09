import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart/cart.component';
export const routes: Routes = [
  {
    path: 'product-list',
    component: ProductListComponent,
    title: 'Product-List'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart'
  },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
];
 