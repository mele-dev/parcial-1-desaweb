import { Component, inject, input, resource, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IonContent, IonGrid, IonRow, IonCol, IonButton, IonInput } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { MainStoreService } from 'src/app/services/main-store.service';

@Component({
  selector: 'app-usuarios-modificar',
  templateUrl: './usuarios-modificar.page.html',
  styleUrls: ['./usuarios-modificar.page.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, IonInput, IonButton, FormsModule],
})
export class UsuariosModificarPage {
  public name = signal<string>('');

  //Aunque al input le pongamos number, va a ser un string. pueden usar parseInt para convertirlo.
  //Aca se va a cargar el id_usuario que viene en la ruta.
  public id_usuario = input.required<string>(); 

  private usuarioService = inject(UsuariosService);
  private readonly router = inject(Router);
  public mainStore = inject(MainStoreService);
  private readonly route = inject(ActivatedRoute);

  // public usuarioResource = resource({
  //   params : () => ({id_usuario : parseInt(this.id_usuario())}),
  //   loader: ({params}) => this.usuarioService.getById(params.id_usuario),
  // });

  // public usuarioResource = resource<User|undefined,{id_usuario:number}>({
  //   defaultValue : undefined,
  //   params : () => ({id_usuario : parseInt(this.id_usuario())}),
  //   loader: ({params}) => this.usuarioService.getById(params.id_usuario),
  // });

  constructor() { }

  async onSubmit(): Promise<void> {
    try {
      await this.usuarioService.updateUsername(Number(this.id_usuario()), this.name());
      // redirecciono de vuelta al home
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error guardando producto', error);
    }
  }

}
