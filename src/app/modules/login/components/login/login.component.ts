import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/modules/usuarios/model/usuario.model';
import { FormRegisterComponent } from './form-register.component';

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
    private dialogRegisterAccountRef: MatDialog
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
