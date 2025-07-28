import { JsonPipe } from '@angular/common';
import { Component, inject, input, OnInit, resource } from '@angular/core';
import { User } from 'src/app/model/user';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-modificar',
  templateUrl: './usuarios-modificar.page.html',
  styleUrls: ['./usuarios-modificar.page.scss'],
  imports : [ JsonPipe ],
})
export class UsuariosModificarPage  implements OnInit {

  //Aunque al input le pongamos number, va a ser un string. pueden usar parseInt para convertirlo.
  //Aca se va a cargar el id_usuario que viene en la ruta.
  public id_usuario = input.required<string>(); 

  private usuarioService = inject(UsuariosService);

  public usuarioResource = resource({
    params : () => ({id_usuario : parseInt(this.id_usuario())}),
    loader: ({params}) => this.usuarioService.getById(params.id_usuario),
  });

  // public usuarioResource = resource<User|undefined,{id_usuario:number}>({
  //   defaultValue : undefined,
  //   params : () => ({id_usuario : parseInt(this.id_usuario())}),
  //   loader: ({params}) => this.usuarioService.getById(params.id_usuario),
  // });

  constructor() { }

  ngOnInit() {}

}
