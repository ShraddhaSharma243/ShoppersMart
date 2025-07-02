import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReceiptDto } from '../../dtos/receipt.dto';
import { mapToReceiptDto } from '../../mappers/receipt.mapper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receipt',
  imports: [CommonModule],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {
  data : any;
  receiptData: ReceiptDto | null = null;

  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras.state?.['data']; 
    this.receiptData = this.data ? mapToReceiptDto(this.data) : {} as ReceiptDto;
  }
}
