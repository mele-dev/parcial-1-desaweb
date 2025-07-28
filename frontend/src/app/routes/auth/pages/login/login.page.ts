import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { IonContent, IonRow, IonCol, IonGrid, IonButton, IonNote, IonInput, IonCardContent, IonCardTitle, IonCardHeader, IonCard } from "@ionic/angular/standalone";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Login, Token, User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonGrid, IonCol, IonRow, LoginFormComponent, IonContent]
})
export class LoginPage  implements OnInit {

  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;
  private authService = inject(AuthService);
  
  constructor() { }

  ngOnInit() {}

  
  public async doAuth (data:Login) {
    const elToken: Token = await firstValueFrom(
      this.httpClient.post<Token>(this.apiUrl + "auth/login",data)
    );

    const usuario = await firstValueFrom(this.httpClient.get<User>(this.apiUrl + "auth/profile",{headers : {
        "Authorization" : "Bearer " + elToken.token
    }}));
    try{
      await this.authService.setToken(elToken.token);
      this.router.navigate(["/protegida"]);
    }catch(error:any){
      console.error(error.message);
    }
  }
}
