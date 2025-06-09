import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductListDataService as ProductService } from '../services/product-list-data.service';
import { FormsModule } from '@angular/forms';
import { mapToProductDto } from '../mappers/product.mapper';
import { ProductDto } from '../dtos/product.dto';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  public products: ProductDto[] = []
  constructor(public productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  public fetchProducts() {
    this.productService.getProducts().subscribe(
      (resp: any) => {
        console.log(resp);
        this.products = mapToProductDto(resp.products, this.cartService);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    )
  }

  addToCart(product: ProductDto) {
    console.log(`before adding is added to cart.`);
    product.isAddedToTheCart = true;
    product.subTotal = product.price * product.quantityOrdered;
    this.cartService.addToCart(product);
  }
}