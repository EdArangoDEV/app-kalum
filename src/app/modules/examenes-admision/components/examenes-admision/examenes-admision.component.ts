import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExamenAdmision } from '../../model/examen-admision.model';
import { MatPaginator } from '@angular/material/paginator';
import { ExamenesAdmisionService } from 'src/app/modules/shared/services/examenes-admision.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { FormExamenAdmisionComponent } from './form-examen-admision.component';

@Component({
  selector: 'app-examenes-admision',
  templateUrl: './examenes-admision.component.html',
  styles: [],
})
export class ExamenesAdmisionComponent implements OnInit {
  displayColumns: string[] = ['no', 'fecha', 'acciones'];

  ngOnInit(): void {
    this.getExamenesAdmision();
  }

  // fuente de origen
  dataSource = new MatTableDataSource<ExamenAdmision>();

  // para paginar las carreras
  @ViewChild(MatPaginator)
  paginador!: MatPaginator;

  constructor(
    private examenesAdmisionService: ExamenesAdmisionService,
    public dialog: MatDialog
  ) {}

  processExamenesAdmision(data: any) {
    const dataExamenesAdmision: ExamenAdmision[] = [];
    let listaExamenesAdmision = data;
    listaExamenesAdmision.forEach((elemento: ExamenAdmision) => {
      dataExamenesAdmision.push(elemento);
    });
    this.dataSource = new MatTableDataSource<ExamenAdmision>(
      dataExamenesAdmision
    );
    this.dataSource.paginator = this.paginador;
  }

  // metodo para conectarse al servicio y traer informacion
  getExamenesAdmision() {
    const data = this.examenesAdmisionService.getExamenes().subscribe({
      next: (data: any) => {
        this.processExamenesAdmision(data);
      },
      error: (response) => {
        if (response && response.error.httpStatusCode) {
          if (
            response.error.httpStatusCode == 503 ||
            response.error.httpStatusCode == 500
          ) {
            Swal.fire(
              'Examenes Admisión',
              '¡Existe un error al consultar listado de los examenes de Admisión, Contacte al administrador del sistema!',
              'error'
            );
          }
        }
      },
    });
  }

  openFormExamenesAdmision() {
    const dialogRef = this.dialog.open(FormExamenAdmisionComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.getExamenesAdmision();
      } else if (result == 2) {
        Swal.fire(
          'Examenes Admisión',
          'Ups!! se genero un error al momento de crear el recurso',
          'error'
        );
      }
    });
  }

  editFormExamenAdmision(examenId: string, fechaExamen: string){
    const dialogRef = this.dialog.open(FormExamenAdmisionComponent, {
      width: '600px',
      data:{examenId, fechaExamen},
      });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.getExamenesAdmision();
      }
    })
  }

  deleteExamenAdmision(examenId: any, fecha: any) {
    Swal.fire({
      title: 'Examenes Admisión',
      text: `¿Esta seguro de eliminar el examen admisión: ${fecha}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true,
      footer: '<a href="">Kalum-app v1.0.0</a>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenesAdmisionService.deleteExamenAdmision(examenId).subscribe({
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
              'Examenes Admisión',
              `Se elimino el examen admisión: ${fecha}`,
              'success'
            );
            this.getExamenesAdmision();
          },
        });
      }
    });
  }

}
