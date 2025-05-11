import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProductStore } from '../../../store/product.store';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule,CardModule,InputTextModule,ButtonModule,CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

productForm!:FormGroup 

productStore=inject(ProductStore)
service=inject(ProductService)
product:any[]=[]
showBtn:boolean=false
id:any
  constructor(private fb:FormBuilder){}
  ngOnInit() {
    this.productForm=this.fb.group({
      name:[''],
      quantity:[''],
      price:['']
    })
   this.service.productId$.subscribe((data)=>{
    if(data){
      this.id=data
     this.showBtn=true
    }
    this.product=this.productStore.products()
    this.product=this.product.filter((ele)=>ele.id==data)
    this.productForm.patchValue({
      name:this.product[0].name,
      quantity:this.product[0].quantity,
      price:this.product[0].price,
    })
    
   })
  }
  submit(){
    
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      this.productStore.addProduct(product); // Add the product to the store
     this.productForm.reset()
    }
   
    
  }
  update(){
   const data: Product = this.productForm.value;
    this.productStore.updateProduct(this.id,{
      name:data?.name,
      price:data?.price,
      quantity:data?.quantity
    })
  }
  back(){
    this.showBtn=false
    this.productForm.reset()
  }
}
