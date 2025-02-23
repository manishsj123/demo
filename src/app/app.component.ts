import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonDataService } from './json-data.service';
import { v4 as uuidv4 } from 'uuid';
import { Router, RouterModule } from '@angular/router';
import { LoginPageComponent } from "./Practiv/login-page/login-page.component";
import { CommanServiceService } from './comman/service/comman-service.service';
import { NavbarComponent } from "./main/navbar/navbar.component";
import { FileMComponent } from "./file-m/file-m.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, NavbarComponent, FileMComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public formData: any;
  public formValue: any = [];
  public isValid: boolean = false;
  public checkpass: boolean = false;
  public userlogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private data: JsonDataService,
    private commanService: CommanServiceService,
    private route: Router
  ) {
    this.formData = this.fb.group({
      id: [''],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      cpass: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.getdata();
    console.log(this.r);
    if (!sessionStorage.getItem("userlogin")) {
      this.route.navigate(['/login'])
    }else{
      this.userlogin=true;
    }

    this.commanService.callfunction$.subscribe({
      next:(res:any)=>{
        this.userloginData(res);
      }
    })
  }

  getdata() {
    // this.data.getdata().subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //     // this.formValue = [];
    //     // res.forEach((ele: any) => {
    //     //   this.formValue.push(ele);
    //     // });
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   }
    // })
  }

  get r() {
    return this.formData.controls;
  }

  subdata(data: any) {
    this.isValid = true;
    if (this.formData.valid) {
      debugger
      if (this.formData.value.pass == this.formData.value.cpass) {
        this.formData.patchValue({ id: uuidv4() });
        this.data.setdata(data.value).subscribe({
          next: (res: any) => {
            this.getdata();
          }
        })
        this.formData.reset();
        this.isValid = false;
        this.checkpass = false;
      } else {
        this.checkpass = true;
      }
    }
  }

  deletedata(id: any) {
    this.data.delete(id).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log(this.formData.value);
        this.getdata();
      }
    })
  }

  editdata(data: any) {
    this.formData.patchValue(data);
  }

  updateData(data1: any) {
    this.data.update(data1.value).subscribe({
      next: (res: any) => {
        this.getdata();
      }
    })
    this.formData.reset();
  }

  userloginData(userdata:any){
    if (sessionStorage.getItem("userlogin")) {
      this.userlogin = true;
    }
  }
}
