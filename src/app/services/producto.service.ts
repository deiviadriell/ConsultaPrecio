import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Producto } from '../interfaces/interface';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private dbPath = '/productos';

  productoRef: AngularFireList<Producto>;
  constructor(private db: AngularFireDatabase) {
    this.productoRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Producto> {
    return this.productoRef;
  }

  create(tutorial: Producto): any {
    return this.productoRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.productoRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.productoRef.remove(key);
  }
  getProducto( codigoBarra: string){    
    return this.db.list<Producto>('productos', ref =>   ref.orderByChild('codigoBarra').equalTo(codigoBarra)).valueChanges();
  }

  deleteAll(): Promise<void> {
    return this.productoRef.remove();
  }
}
