import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonButton, IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  selector: 'app-normal',
  templateUrl: './normal.layout.html',
  styleUrls: ['./normal.layout.scss'],
  imports: [IonContent, IonRouterOutlet, RouterLink, IonButton],
})
export class NormalLayout  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Init normal layout");
  }

}
