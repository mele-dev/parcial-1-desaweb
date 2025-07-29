import { Component, inject, input, OnInit, signal } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonSelectOption } from "@ionic/angular/standalone";
import { Localidad } from 'src/app/model/localidad';
import { MainStoreService } from 'src/app/services/main-store.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IonSelect } from "../../../../node_modules/@ionic/angular/standalone/directives/select";
import { Departamento } from 'src/app/model/departamento';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonSelectOption, IonSelect, FormsModule],
})
export class HomePage  implements OnInit {
  public id_departamento = signal<string>('');
  public localidades: Localidad[] = [];
  public departamentos: Departamento[] = [];
  public id_usuario = input.required<string>(); 

  public mainStore = inject(MainStoreService);

  private usuarioService = inject(UsuariosService);

  constructor() { }

  async ngOnInit() {
    try {
      this.localidades = await this.usuarioService.getLocalidadesDeUnUsuarioYDepto(Number(this.id_usuario()), Number(this.id_departamento()));
    } catch (error) {
      console.error('Error', error);
    }
  }

}
