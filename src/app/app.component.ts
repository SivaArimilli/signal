import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductChartComponent } from './components/product-chart/product-chart.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ProductFormComponent,ProductTableComponent,ProductChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demoSignals';
}
