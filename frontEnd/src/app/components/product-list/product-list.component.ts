import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { mapToProductDto } from '../../mappers/product.mapper';
import { ProductDto } from '../../dtos/product.dto';
import { CartService } from '../../services/cart.service';

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
      {
        next: (resp: any) => {
          try{
        this.products = mapToProductDto(resp, this.cartService);
        } catch (error) {
          console.error("Error mapping products", error);
      }
    },
      error: (err: unknown) => console.error("Error fetching products", err),      
  });
  }

  addToCart(product: ProductDto) {
    this.cartService.addToCart(product);
  }
}