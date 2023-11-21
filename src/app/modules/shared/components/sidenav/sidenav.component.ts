import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/login/components/login/login.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  // opciones que va a tener el SidNav
  menuNav = [
    { name: 'Home', route: 'home', icon: 'home' },
    { name: 'Carreras', route: 'carreras', icon: 'category' },
    { name: 'Examenes Admisión', route: 'examenes', icon: 'psychology_alt' },
    {name: 'Jornadas', route: 'jornadas', icon: 'schedule'}
  ];

  mobileQuery: MediaQueryList;

  ngOnInit(): void {}

  // para darle el ancho al sideNav
  constructor(media: MediaMatcher, public dialogLogin: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  openFormLogin(){
    const dialogRef = this.dialogLogin.open(LoginComponent, {width: '500px'});
  }


}
