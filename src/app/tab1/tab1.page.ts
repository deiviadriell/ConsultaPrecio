import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Escaneo } from '../interfaces/interface';
import { ProductoService } from '../services/producto.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  miFormulario: FormGroup = this.fb.group({
    nombre:[,[Validators.required]],
    precio: [, [Validators.required]],
    codigoBarra: [, [Validators.required]],
    descripcion: [,[]]    
  })
  codigo: Escaneo;

  

  constructor( private fb: FormBuilder,
                private barcodeScanner: BarcodeScanner,
                private productoService: ProductoService,
                private toastCtrl: ToastController) {}

  limpiar(){
    this.miFormulario.reset();

  }
  scan() {   

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);      
      this.miFormulario.get('codigoBarra').setValue(barcodeData.text);
      
     }).catch(err => {
         console.log('Error', err);
     });
  }
  saveProducto(){    

      this.productoService.getProducto(this.miFormulario.get('codigoBarra').value).subscribe(data => {
        console.log(data);
        if( data.length === 0){
          this.productoService.create(this.miFormulario.value).then(() => {
            this.presentToast('Producto registrado correctamente.');
          })
        } else {
          this.presentToast('Producto ya registrado');
        }

        
        
      });
  
      
    
  }
  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
