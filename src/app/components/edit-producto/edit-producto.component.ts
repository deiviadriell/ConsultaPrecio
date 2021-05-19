import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProductoService } from '../../services/producto.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.scss'],
})
export class EditProductoComponent implements OnInit {
  producto: Producto;
  @Input() key: string ='';
  @Input() codigoBarra: string ='';
  @Input() precio: string ='';
  @Input() nombre: string ='';
  @Input() descripcion: string ='';
  miFormulario: FormGroup = this.fb.group({
    nombre:[,[Validators.required]],
    precio: [, [Validators.required]],
    codigoBarra: [, [Validators.required]],
    descripcion: [,[]]    

  })
  
  

  constructor( private fb: FormBuilder,
              private barcodeScanner: BarcodeScanner,
              private productoService: ProductoService,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.miFormulario.reset({      
      nombre:this.nombre,
      precio: this.precio,
      codigoBarra: this.codigoBarra,
      descripcion: this.descripcion    

    })
    
    
    
  }
  regresar(){
    this.modalCtrl.dismiss();
  }
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
  updateProducto(){    
    this.productoService.update(this.key,this.miFormulario.value).then(() => {
      this.presentToast();
    })
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Producto actualizado correctamente.',
      duration: 2000
    });
    toast.present();
  }

}
