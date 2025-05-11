import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Product } from '../models/product.model';

interface ProductState {
  products: Product[];   
  lastId: number;       
}
const initialState: ProductState = {
  products: [],  
  lastId: 0,    
};
export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(({ products, lastId, ...store }) => ({
    addProduct(productData: Omit<Product, 'id'>) {
      const newId = lastId() + 1; 
      const newProduct: Product = {
        id: newId,
        ...productData,
      };
      patchState(store, {
        products: [...products(), newProduct], 
        lastId: newId,                     
      });
    },
     deleteProduct(productId: number) {
      const updatedProducts = products().filter(product => product.id !== productId);
      patchState(store, {
        products: updatedProducts,
      });
    },
     updateProduct(productId: number, updatedData: Partial<Omit<Product, 'id'>>) {
     
      const updatedProducts = products().map(product => 
        product.id === productId ? { ...product, ...updatedData } : product
      );
      patchState(store, {
        products: updatedProducts,
      });
    }
  }))
 
);
