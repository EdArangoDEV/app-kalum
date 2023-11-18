import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private digalogRef: MatDialogRef<LoginComponent>)
  {  }

  OnInit(): void {
    
  }

  onClose (){
    this.dialogRef.close(2);
  }
}
