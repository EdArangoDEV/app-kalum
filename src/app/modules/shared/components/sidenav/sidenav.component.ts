import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  // opciones que va a tener el SidNav
  menuNav = [
    { name: 'Home', route: 'home', icon: 'home' },
    { name: 'Carreras', route: 'home', icon: 'category' },
    { name: 'Examenes', route: 'home', icon: 'calendar_today' },
  ];

  mobileQuery: MediaQueryList;

  // para darle el ancho al sideNav
  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('{max-width: 600px}');
  }

  ngOnInit(): void {}
}
