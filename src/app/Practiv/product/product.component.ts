import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CommanServiceService } from '../../comman/service/comman-service.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  data$: Observable<any[]> | undefined; 

  constructor(private ser:CommanServiceService) { }

  ngOnInit() {
    debugger
    this.ser.getdata().subscribe({
      next:(res:any)=>{
        console.log(res);
      }
    })
    this.data$ = this.ser.getdata();
  }
}
