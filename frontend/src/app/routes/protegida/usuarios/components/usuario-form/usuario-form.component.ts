import { JsonPipe } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonRow, IonCol, IonInput, IonLabel, IonItem, IonCheckbox, IonButton, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
import { ReservadoDirective } from 'src/app/directives/reservado.directive';
import { User } from 'src/app/model/user';
import { ErrorMessagePipe } from 'src/app/pipes/error-message.pipe';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  imports: [IonRow, IonCol, IonInput, FormsModule, IonLabel, IonItem, IonCheckbox, IonButton, IonSelect, JsonPipe, IonSelectOption, ReservadoDirective, ErrorMessagePipe],
})
export class UsuarioFormComponent  implements OnInit {

  public rolesTotales = input.required<string[]>();
  public usuario = input<User>({nombre: '', roles: ["admin"]});  //Si no se setea arranca con usuario vacío.
  public nombre = signal<string>(this.usuario().nombre);
  public roles = signal<string[]>(this.usuario().roles);
  public cambiado = output<User>();

  constructor() { }

  ngOnInit() {}

  onRoleChange (event:any,rol:string) {
    console.log({event});
    console.log(rol);
    const actual = this.roles();
    if (event.detail.checked) {
      this.roles.set([...actual, rol]);
    } else {
      this.roles.set(actual.filter(r => r !== rol));
    }
    console.log("ROLES: ",this.roles());
  }

  onSelectChange (event:any) {
    console.log({event});
    const actual = this.roles();
    const rol = event.detail.value;
    console.log({rol});
    if (event.detail.checked) {
      this.roles.set([...actual, rol]);
    } else {
      this.roles.set(actual.filter(r => r !== rol));
    }
    console.log("ROLES: ",this.roles());
  }

  onSubmit(){
    const usuarioModificado : User = {
      id_usuario : this.usuario().id_usuario,
      nombre: this.nombre(),
      roles : this.roles()
    }
    this.cambiado.emit(usuarioModificado);
  }

}
