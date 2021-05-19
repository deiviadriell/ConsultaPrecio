import { Component } from '@angular/core';
import { Producto } from '../interfaces/interface';
import { ProductoService } from '../services/producto.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  producto: Producto[] = [];

  constructor( private productoService: ProductoService,
              private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController) {}

  getProducto(codigoBarra: string ) {
    this.productoService.getProducto(codigoBarra).subscribe(data => {
      this.producto = data;
      if( this.producto.length ===0){
        this.presentToast("Producto no encontrado");
      }
      
    });

  }
  scan() {   
    

    this.barcodeScanner.scan().then(barcodeData => {
      this.getProducto(barcodeData.text);           
     }).catch(err => {
       this.presentToast(`Error: ${JSON.stringify(err)}`);         
     });
     
  }
  async presentToast(msg : string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
