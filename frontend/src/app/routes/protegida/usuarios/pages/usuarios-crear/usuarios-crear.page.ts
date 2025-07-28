import { Component, inject, OnInit, signal } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';
import { User } from 'src/app/model/user';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-crear',
  templateUrl: './usuarios-crear.page.html',
  styleUrls: ['./usuarios-crear.page.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, UsuarioFormComponent],
})
export class UsuariosCrearPage  implements OnInit {

  private usuarioService = inject(UsuariosService);
  public rolesTotales = signal<string[]>(["admin","normal", "full"]);
  private router = inject(Router);

  constructor() { }

  ngOnInit() {}

  onCreado(usuario:User){
    try{
      console.log({usuario});
      const usuarioCreado = this.usuarioService.crear(usuario);
      console.log({usuarioCreado});
      this.router.navigate(["protegida","usuarios"]);
    }catch (error:any) {
      console.error(error.message);
    }
  }

}
