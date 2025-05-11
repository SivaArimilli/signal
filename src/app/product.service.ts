import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productId = new Subject<any>();
  public productId$ = this.productId.asObservable();
  constructor() { }
  
}
