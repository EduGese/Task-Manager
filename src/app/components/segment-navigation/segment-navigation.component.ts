import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-segment-navigation',
  templateUrl: './segment-navigation.component.html',
  styleUrls: ['./segment-navigation.component.scss'],
  standalone: true,
  imports:[CommonModule, IonicModule, RouterLink, RouterLinkActive,]
})
export class SegmentNavigationComponent  {

  constructor() { }



}
