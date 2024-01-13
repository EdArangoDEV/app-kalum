import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/modules/usuarios/model/usuario.model';
import { FormRegisterComponent } from './form-register.component';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  usuario: Usuario = new Usuario();

  // constructor
  constructor(
    private formBuilder: FormBuilder,
    private dialogLoginRef: MatDialogRef<LoginComponent>,
    private dialogRegisterAccountRef: MatDialog,
    private authService: AuthService
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    this.usuario.username = this.loginForm.get('username')?.value;
    this.usuario.password = this.loginForm.get('password')?.value;
    // console.log(this.usuario);
    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        const payload = this.authService.getPayload(response.token);
        this.authService.saveUsuario(payload);
        Swal.fire({
          icon: 'success',
          title: 'Sesión iniciada',
          text: `${payload.username} bienvenido al sistema Kalum v1.0.0`,
          footer: '<a href="">Kalum-app v1.0.0</a>',
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialogLoginRef.close(1);
            window.location.reload();
          }
        });
        console.log(response);
      },
      error: (error) => {
        console.log(error);
        Swal.fire(
          'Error',
          'Ocurrio un error al momento de Iniciar sesion, valide Usuario y contraseña',
          'error'
        )
      },
    });
  }

  // metodo para cerrar formulario
  onClose() {
    this.dialogLoginRef.close(2);
  }

  // para abrir formulario de nueva cuenta
  onCreateAccount() {
    const formRegisterAccount = this.dialogRegisterAccountRef.open(
      FormRegisterComponent,
      { width: '450px' }
    );
    this.dialogLoginRef.close(2);
  }
}
