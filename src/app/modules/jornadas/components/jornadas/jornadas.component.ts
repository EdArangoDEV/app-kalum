import { Component, OnInit, ViewChild } from '@angular/core';
import { Jornada } from '../../model/jornada.model';
import { JornadaService } from 'src/app/modules/shared/services/jornada.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { FormRegisterAspiranteComponent } from 'src/app/modules/carreras-tecnicas/components/carreras-tecnicas/form-register-aspirante.component';
import { LoginComponent } from 'src/app/modules/login/components/login/login.component';
import { FormJornadasComponent } from './form-jornadas.component';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styles: [],
})
export class JornadasComponent implements OnInit {
  displayColumns: string[] = ['no', 'prefijo', 'descripcion', 'acciones'];

  ngOnInit(): void {
    this.getJornadas();
  }

  // fuente de origen
  dataSource = new MatTableDataSource<Jornada>();

  // para paginar jornadas
  @ViewChild(MatPaginator)
  paginador!: MatPaginator;

  constructor(
    private jornadaService: JornadaService,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}

  processJornadasResponse(data: any) {
    const dataJornadas: Jornada[] = [];
    let listaJornadas = data;
    listaJornadas.forEach((elemento: Jornada) => {
      dataJornadas.push(elemento);
    });
    // console.log(dataJornadas);
    this.dataSource = new MatTableDataSource<Jornada>(dataJornadas);
    this.dataSource.paginator = this.paginador;
  }

  // metodo para conectarse al servicio y traer informacion de las jornadas
  getJornadas() {
    const data = this.jornadaService.getJornadas().subscribe({
      next: (data: any) => {
        this.processJornadasResponse(data);
      },
      error: (response) => {
        if (response && response.error.httpStatusCode) {
          if (
            response.error.httpStatusCode == 503 ||
            response.error.httpStatusCode == 500
          ) {
            Swal.fire(
              'Jornadas',
              '!Existe un error al consultar listado de Jornadas, contacte al administrador del sistema¡',
              'error'
            );
          }
        }
      },
    });
  }

  openFormJornada() {
    const dialogRef = this.dialog.open(FormJornadasComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.getJornadas();
      } else if (result == 2) {
        Swal.fire(
          'Jornadas',
          'Ups!! se genero un error al momento de crear el recurso',
          'error'
        );
      }
    });
  }

  editFormJornada(jornadaId: string, prefijo: string, descripcion: string) {
    const dialogRef = this.dialog.open(FormJornadasComponent, {
      width: '600px',
      data: { jornadaId, prefijo, descripcion },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.getJornadas();
      }
    });
  }

  deleteJornada(jornadaId: any, descripcion: any) {
    Swal.fire({
      title: 'Jornadas',
      text: `¿Esta seguro de eliminar la Jornada: ${descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true,
      footer: '<a href="">Kalum-app v1.0.0</a>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.jornadaService.deleteJornada(jornadaId).subscribe({
          error: (data: any) => {
            if (data.httpStatusCode && data.httpStatusCode == 503) {
              Swal.fire(
                'Error',
                'Ocurrio un error al momento de eliminar el registro',
                'error'
              );
            }
          },
          next: (data) => {
            Swal.fire(
              'Jornadas',
              `Se elimino la Jornada: ${descripcion}`,
              'success'
            );
            this.getJornadas();
          },
        });
      }
    });
  }

  openEnrrollmentJornada(jornadaId: string, descripcion: string) {
    if (this.authService.isAuthenticated()) {
      // proceso de confirmacion para cerrera tecnia
      // ROLE_USER = 0 | ROLE_CANDIDATE = EXP-20230001 | ROLE_STUDENT = 20230001
      if (this.authService.usuario.identificationId === '0') {
        const formRegisterAspirante = this.dialog.open(
          FormRegisterAspiranteComponent,
          { width: '500px', data: { jornadaId, descripcion } }
        );
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Asignar Jornada',
        html: 'Debes iniciar sesión o crear una cuenta',
        footer: 'Kalum v1.0.0',
      }).then((result) => {
        if (result.isConfirmed) {
          this.dialog.open(LoginComponent, { width: '450px' });
        }
      });
    }
  }
}
