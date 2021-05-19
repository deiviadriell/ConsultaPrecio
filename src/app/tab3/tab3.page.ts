import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../interfaces/interface';
import { map } from 'rxjs/operators';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { EditProductoComponent } from '../components/edit-producto/edit-producto.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  productos: Producto[] = [];
  textoBuscar: string = '';

  constructor(private productoService: ProductoService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {}
  ngOnInit(): void {
    this.productoService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.productos = data;
    });
    
  }
  async editarProducto( producto: Producto) {
    console.log(producto);


    const modal = await this.modalCtrl.create({
      component: EditProductoComponent,   
      componentProps: {...producto}
    });
    return await modal.present();
  }
  async eliminar( producto: Producto) {
    const alert = await this.alertCtrl.create({      
      header: 'Confirmar',
      message: `<strong>¿Producto a eliminar: ${producto.nombre}?</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok!',
          handler: () => {
            this.productoService.delete(producto.key);
            this.presentToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Producto Eliminado correctamente.',
      duration: 2000
    });
    toast.present();
  }

  edit() {

    
  }
  delete() {

  }
  onSearchChange( event) {
    this.textoBuscar = event.detail.value;

  }
  

}
