import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { CommanServiceService } from '../../comman/service/comman-service.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  public formValue: any;
  public loginsuccess: boolean = true;
  public Uname :any;
  public imgpath : any;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private commanService: CommanServiceService
  ) {
    this.formValue = this.fb.group({
      id: [''],
      email: [''],
      pass: [''],
    })
  }

  subForm() {
    this.loginsuccess = false;
    // this.formValue.patchValue({ id: uuidv4() });
    
    this.Uname = this.formValue.value.email.split('').map((letter:any) => letter.toUpperCase());
    
    this.mostrarLetras();
  }

  //Welcome message


  letras: string[] = [];

 
  mostrarLetras(): void {
    let delay = 0;
    this.letras = this.Uname;
    this.letras.forEach((letra, index) => {
      setTimeout(() => {
        const letraElement = document.querySelectorAll('.letra')[index];
        if (letraElement) {
          letraElement.classList.add('show'); 
        }
      }, delay);
      delay += 100; 
    });

    
    setTimeout(() => {
      this.desaparecerLetras();
    }, this.letras.length * 200 + 2000); 
  }

  
  desaparecerLetras(): void {
    this.letras.forEach((letra, index) => {
      setTimeout(() => {
        const letraElement = document.querySelectorAll('.letra')[index];
        if (letraElement) {
          letraElement.classList.add('desaparecer'); 
        }
      }, index * 100); 
    });

 
    setTimeout(() => {
        sessionStorage.setItem("userlogin", "true");
        this.route.navigateByUrl('/home');
        this.commanService.tiggerfunction("From Login");
    }, this.letras.length * 200);
  }
  
}
