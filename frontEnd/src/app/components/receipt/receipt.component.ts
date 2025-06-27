import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReceiptDto } from '../../dtos/receipt.dto';
import { mapToReceiptDto } from '../../mappers/ReceiptResponse.mapper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receipt',
  imports: [CommonModule],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {
  data : any;
  receiptData: ReceiptDto;

  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras.state?.['data']; 
    this.receiptData = mapToReceiptDto(this.data);
  }
}
