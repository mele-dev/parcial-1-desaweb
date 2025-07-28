import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInput, IonButton, IonRow, IonCol } from "@ionic/angular/standalone";
import { firstValueFrom } from 'rxjs';
import { Login, User } from 'src/app/model/user';
import { MainStoreService } from 'src/app/services/main-store.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonCol, IonRow, IonButton, IonInput, FormsModule],
})
export class LoginFormComponent {

  public submitted = output<Login>();

  public usuario = signal<string>("");
  public password = signal<string>("");

  public misenial = computed(() => this.usuario().toUpperCase());

  
  async onSubmit(){
    const datos:Login  = {
    usuario : this.usuario(),
    password: this.password()
  }
    this.submitted.emit(datos);
  }

}
