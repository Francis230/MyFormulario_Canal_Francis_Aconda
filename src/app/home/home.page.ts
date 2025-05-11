import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
// Componente principal de la aplicacion 
export class HomePage implements OnInit {
  // DEfinicion de las variables 
  formulario!: FormGroup;
  // Variables del Formulario 
  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private alertController: AlertController
  ) {}
  // Inicializacion del formlario para la creacion de un Canal 
  ngOnInit() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      categoria: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      pais: [''],
      correo: ['', [Validators.required, Validators.email]],
      monetizado: [false],
      redes: [[]]
    });
  }
  // Accion para guardar los datos en Firebase
  async guardar() {
    const datos = this.formulario.value;
    const ref = collection(this.firestore, 'canales');
    try {
      await addDoc(ref, datos);
      this.formulario.reset();
      this.presentAlert('Canal guardado correctamente');
    } catch (error) {
      console.error(error);
      this.presentAlert('Error al guardar los datos');
    }
  }
// Funcion para mostrar un mensaje de alerta de la verificacion de los datos guardados 
  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}


