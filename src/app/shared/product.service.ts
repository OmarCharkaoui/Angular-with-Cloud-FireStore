import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

// productData: Product[];

  constructor(private firestore: AngularFirestore) { }

  getProducts()
  {
    return this.firestore.collection('ProductDb').snapshotChanges();
  }
  createProduct(product: Product)
  {
    return this.firestore.collection('ProductDb').add(product);
  }
  updateProduct( product: Product,id:string )
  {
     delete product.id;
      this.firestore.collection('ProductDb').doc(id).update(product);
  }
  deleteProduct( productId: string )
  {
    this.firestore.doc('ProductDb/'+ productId).delete();

  }
  getProductbyId(productId:string)
  {
    return this.firestore.doc('ProductDb/'+ productId).snapshotChanges().pipe(

      map(changes=>{
        const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data } as Product;
      })
    );

  }
  

/*
getProduct(id: number): Observable<Product> {
    const productsDocuments = this.db.doc<Product>('products/' + id);
    return productsDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }


*/

}
