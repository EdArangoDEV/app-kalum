import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/login/components/login/login.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
    { name: 'Jornadas', route: 'jornadas', icon: 'schedule' },
  ];

  mobileQuery: MediaQueryList;

  ngOnInit(): void {}

  // para darle el ancho al sideNav
  constructor(
    media: MediaMatcher,
    public dialogLogin: MatDialog,
    public authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  openFormLogin() {
    const dialogRef = this.dialogLogin.open(LoginComponent, { width: '500px' });
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logOut();
    Swal.fire({
      icon: 'success',
      title: 'LogOut',
      text: `${username}, has cerrado sesión.`,
      footer: '<a href="">Kalum-app v1.0.0</a>',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    })
    
  }
}
