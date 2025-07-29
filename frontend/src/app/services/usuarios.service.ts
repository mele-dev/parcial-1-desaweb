import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { Localidad } from '../model/localidad';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = environment.apiUrl+ "usuarios";
  private httpClient = inject(HttpClient);

  constructor() { }

  async getAll(){
    return firstValueFrom(this.httpClient.get<User[]>(this.url));
  }

  async crear(usuario: User){ 
    return firstValueFrom(this.httpClient.post<User>(this.url,usuario));
  }

   async getById(id_usuario:number){
    return firstValueFrom(this.httpClient.get<User>(this.url+"/"+id_usuario));
  }

  async updateUsername(id_usuario: number, username: string) {
    const nuevoBody = await this.getById(id_usuario);
    nuevoBody.nombre = username;
    return firstValueFrom(this.httpClient.put<User>(`${this.url}/${id_usuario}`, nuevoBody));
  }

  async getLocalidadesDeUnUsuarioYDepto(id_usuario: number, id_departamento: number){
    return firstValueFrom(this.httpClient.get<Localidad[]>(`${this.url}/${id_usuario}/departamentos/${id_departamento}/localidades`));
  }
}
