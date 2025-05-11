import { Component, effect, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductStore } from '../../../store/product.store';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-table',
  imports: [TableModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit{
   productStore=inject(ProductStore)
   service=inject(ProductService)

constructor(){}
  ngOnInit() {
  
    
  }
delete(id:any){

  this.productStore.deleteProduct(id)
}
update(id:any){
   this.service.productId.next(id)
}
}
