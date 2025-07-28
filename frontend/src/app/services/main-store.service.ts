import { effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../model/user';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {

  public usuario = signal<User | undefined >(undefined); 
  public token = signal<string | undefined >(undefined); 
  private efecto = effect(() => console.log("Usuario desde effect: ", this.usuario()));

}
