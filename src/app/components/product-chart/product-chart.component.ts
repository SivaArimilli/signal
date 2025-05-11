import { Component, effect, inject, OnInit } from '@angular/core';
import {Chart,registerables} from 'chart.js'
import { ProductStore } from '../../../store/product.store';
Chart.register(...registerables)
@Component({
  selector: 'app-product-chart',
  imports: [],
  templateUrl: './product-chart.component.html',
  styleUrl: './product-chart.component.css'
})
export class ProductChartComponent implements OnInit {
 lableData:any[]=[]
 price:any[]=[]
 quantity:any[]=[]
 productStore=inject(ProductStore)
 chartInstance: Chart | null = null;
 constructor(){
  effect(()=>{
     this.lableData=this.productStore.products()
    this.quantity=this.lableData.map((ele)=>ele.quantity)
     this.price=this.lableData.map((ele)=>ele.price)
     console.log(this.lableData,'efffect');
     this.chart()
    })
 }
  ngOnInit() {
    
    this.lableData.push(this.productStore.products().map((ele)=>ele.name))
    console.log(this.lableData,'data')
  }
 
chart(){

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas with ID "myChart" not found');
      return;
    }
 this.chartInstance=new Chart('myChart',{
 type:'bar',
 data:{
  labels:this.lableData.map((ele)=>ele.name),
  datasets:[
    {
        label: 'Price',
        data: this.price,
        backgroundColor: '#4CAF50'
      },
      {
        label: 'Qantity',
        data: this.quantity,
        backgroundColor: '#FF9800'
      }
  ]

 },
 options:{
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
 }
  })
}
}
