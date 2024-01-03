import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarreraTecnica } from '../../model/carrera-tecnica.model';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormCarreraTecnicaComponent } from './form-carrera-tecnica.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { LoginComponent } from 'src/app/modules/login/components/login/login.component';
import { FormRegisterAspiranteComponent } from './form-register-aspirante.component';

@Component({
  selector: 'app-carreras-tecnicas',
  templateUrl: './carreras-tecnicas.component.html',
  styles: [],
})
export class CarrerasTecnicasComponent implements OnInit {
  displayColumns: string[] = ['no', 'nombre', 'acciones'];

  ngOnInit(): void {
    this.getCarrerasTecnicas();
  }

  // fuente de origen
  dataSource = new MatTableDataSource<CarreraTecnica>();

  // para paginar las carreras
  @ViewChild(MatPaginator)
  paginador!: MatPaginator;

  constructor(
    private carreraTecnicaService: CarreraTecnicaService,
    public dialog: MatDialog,
    public authService: AuthService
  ) {}

  processCarrerasTecnicasResponse(data: any) {
    const dataCarreraTecnica: CarreraTecnica[] = [];
    let listaCarrerasTecnicas = data;
    listaCarrerasTecnicas.forEach((elemento: CarreraTecnica) => {
      dataCarreraTecnica.push(elemento);
    });
    // console.log(dataCarreraTecnica);
    this.dataSource = new MatTableDataSource<CarreraTecnica>(
      dataCarreraTecnica
    );
    this.dataSource.paginator = this.paginador;
  }

  // metodo para conectarse al servicio y traer informacion
  getCarrerasTecnicas() {
    const data = this.carreraTecnicaService.getCarreras().subscribe({
      next: (data: any) => {
        this.processCarrerasTecnicasResponse(data);
      },
      error: (response) => {
        if (response && response.error.httpStatusCode) {
          if (
            response.error.httpStatusCode == 503 ||
            response.error.httpStatusCode == 500
          ) {
            Swal.fire(
              'Carreras Técnicas',
              '¡Existe un error al consultar listado de carreras técnicas, Contacte al administrador del sistema!',
              'error'
            );
          }
        }
      },
    });
  }

  // isObjectEmpty(objectName: any){
  //   return Object.keys(objectName).length === 0 && objectName.constructor === Object;
  // }

  openFormCarreraTecnica() {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.getCarrerasTecnicas();
      } else if (result == 2) {
        Swal.fire(
          'Carreras Técnicas',
          'Ups!! se genero un error al momento de crear el recurso',
          'error'
        );
      }
    });
  }

  editFormCarreraTecnica(carreraId: string, nombre: string) {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, {
      width: '600px',
      data: { carreraId, nombre },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.getCarrerasTecnicas();
      }
    });
  }

  deleteCarreraTecnica(carreraId: any, nombre: any) {
    Swal.fire({
      title: 'Carreras Técnicas',
      text: `¿Esta seguro de eliminar la carrera técnica: ${nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true,
      footer: '<a href="">Kalum-app v1.0.0</a>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carreraTecnicaService.deleteCarreraTecnica(carreraId).subscribe({
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
              'Carreras Técnicas',
              `Se elimino la carrera ténica: ${nombre}`,
              'success'
            );
            this.getCarrerasTecnicas();
          },
        });
      }
    });
  }

  openEnrrollmentCarreraTecnica(carreraId: string, nombre: string) {
    if (this.authService.isAuthenticated()) {
      // proceso de confirmacion para cerrera tecnia
      // ROLE_USER = 0 | ROLE_CANDIDATE = EXP-20230001 | ROLE_STUDENT = 20230001
      if (this.authService.usuario.identificationId === '0') {
        const formRegisterAspirante = this.dialog.open(
          FormRegisterAspiranteComponent,
          { width: '500px', data: { carreraId, nombre } }
        );
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Asignar carrera técnica',
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
