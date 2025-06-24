import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import {NewProductEntryFormComponent } from './components/new-product-form/new-product-form.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
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
  {
    path: 'receipt',
    component: ReceiptComponent,
    title: 'Receipt'
  },
  {
    path: 'new-product-form',
    component: NewProductEntryFormComponent,
    title: 'new-product-form'
  },
   {
    path: 'new-category',
    component: NewCategoryComponent,
    title: 'new-category'
  },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
];
 