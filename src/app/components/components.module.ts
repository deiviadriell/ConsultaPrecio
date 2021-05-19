import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ HeaderComponent, EditProductoComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports:[ HeaderComponent, EditProductoComponent]
})
export class ComponentsModule { }
