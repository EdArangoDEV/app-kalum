import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/modules/usuarios/model/usuario.model';
import { LoginComponent } from './login.component';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styles: [],
})
export class FormRegisterComponent implements OnInit {
  ngOnInit(): void {}

  hide = true;
  public formRegister: FormGroup;
  usuario: Usuario = new Usuario();

  constructor(
    private formBuilder: FormBuilder,
    public dialogLogin: MatDialog,
    private dialogRegisterRef: MatDialogRef<FormRegisterComponent>
  ) {
    this.formRegister = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      normalizedUserName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onCreate() {
    this.usuario.username = this.formRegister.get('username')?.value;
    this.usuario.email = this.formRegister.get('email')?.value;
    this.usuario.normalizedUserName =
      this.formRegister.get('normalizedUserName')?.value;
    this.usuario.password = this.formRegister.get('password')?.value;
    this.usuario.roles.push('ROLE_USER');
    console.log(this.usuario);
  }

  onBack() {
    const dialogRef = this.dialogLogin.open(LoginComponent, { width: '500px' });
    this.dialogRegisterRef.close(2);
  }

  onCancel() {
    this.dialogRegisterRef.close(2);
  }
}
