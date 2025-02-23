import { Routes } from '@angular/router';
import { HomeComponent } from './Practiv/home/home.component';
import { ProductComponent } from './Practiv/product/product.component';
import { LoginPageComponent } from './Practiv/login-page/login-page.component';
import { FileMComponent } from './file-m/file-m.component';

export const routes: Routes = [
    {path : 'home', component: HomeComponent},
    {path : 'proc', component: ProductComponent},
    {path : 'login', component:LoginPageComponent},
    {path : 'file', component:FileMComponent}
];
