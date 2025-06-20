import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { StockEntryFormComponent } from './components/stock-entry/stock-entry-form.component';
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
    path: 'inventory-form',
    component: StockEntryFormComponent,
    title: 'inventory-form'
  },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
];
 