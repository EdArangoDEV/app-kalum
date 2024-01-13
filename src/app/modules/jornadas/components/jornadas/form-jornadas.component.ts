import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JornadaService } from 'src/app/modules/shared/services/jornada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-jornadas',
  templateUrl: './form-jornadas.component.html',
  styles: [],
})
export class FormJornadasComponent implements OnInit {
  public jornadaFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private jornadaService: JornadaService,
    private dialogRef: MatDialogRef<FormJornadasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.jornadaFormGroup = this.formBuilder.group({
      prefijo: [data != null ? data.prefijo : '', Validators.required],
      descripcion: [data != null ? data.descripcion : '', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSave() {
    let dataForm = {
      prefijo: this.jornadaFormGroup.get('prefijo')?.value,
      descripcion: this.jornadaFormGroup.get('descripcion')?.value,
    };

    if (this.data != null) {
      this.jornadaService
        .updateJornada({
          jornadaId: this.data.jornadaId,
          prefijo: dataForm.prefijo,
          descripcion: dataForm.descripcion,
        })
        .subscribe({
          next: (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Jornadas',
              text: `Se actualizo correctamente la Jornada: ${dataForm.descripcion}.`,
              footer: '<a href="">Kalum-app v1.0.0</a>',
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close(1);
              }
            });
          },
          error: (error) => {
            if (error.status == 400 || error.status == 503) {
              Swal.fire({
                icon: 'error',
                title: 'Jornadas',
                text: `No fue posible actualizar la información, valide `,
                footer: '<a href="">Kalum-app v1.0.0</a>',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close(3);
                }
              });
            }
          },
          complete: () => console.log('Proceso finalizado'),
        });
    } else {
      // alert(JSON.stringify(data));
      this.jornadaService.addJornada(dataForm).subscribe({
        next: (response: any) => {
          // alert(JSON.stringify(response));
          Swal.fire({
            icon: 'success',
            title: 'Jornadas',
            text: `Se agrego correctamente la Jornada: ${response.descripcion}.`,
            footer: '<a href="">Kalum-app v1.0.0</a>',
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close(1);
              // console.log(response);
            }
          });
        },
        error: (response) => {
          if (response.error.httpStatusCode) {
            if (
              response.error.httpStatusCode == 503 ||
              response.error.httpStatusCode == 500
            ) {
              Swal.fire({
                icon: 'error',
                title: 'Jornadas',
                text: `¡Error al consumir el servicio legado de la base de datos, contacte al administrador del sistema!`,
                footer: '<a href="">Kalum-app v1.0.0</a>',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close(3);
                }
              });
            }
          }
        },
      });
    }
  }

  // para cencelar formulario
  onCancel() {
    this.dialogRef.close(3);
  }
}
