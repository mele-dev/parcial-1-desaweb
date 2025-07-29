import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonMenu, IonToolbar, IonHeader, IonTitle, IonContent, IonMenuToggle, IonButton, IonButtons, IonMenuButton, IonRouterOutlet} from "@ionic/angular/standalone";
import { MainStoreService } from 'src/app/services/main-store.service';

@Component({
  selector: 'app-authed',
  templateUrl: './authed.layout.html',
  styleUrls: ['./authed.layout.scss'],
  imports: [IonMenu, RouterLink, IonToolbar, IonHeader, IonTitle, IonContent, IonMenuToggle, IonButton, IonButtons, IonMenuButton, IonRouterOutlet],
})
export class AuthedLayout  implements OnInit {

  public mainStore = inject(MainStoreService);

  constructor() { }

  ngOnInit() {
    
    console.log("Init AuthedLayout");
    console.log(`usuario ${this.mainStore.usuario()?.id_usuario}`);
  }

}
