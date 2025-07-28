import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonSplitPane, IonContent, IonMenu, IonButtons, IonMenuButton, IonRouterLink, IonButton, IonMenuToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  constructor() {

  }
}
