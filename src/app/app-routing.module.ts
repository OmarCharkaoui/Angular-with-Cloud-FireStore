import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './project/create-product/create-product.component';
import { ProductsListComponent } from './project/products-list/products-list.component';
import { EditProductComponent } from './project/edit-product/edit-product.component';


const routes: Routes = [
  { path:'', redirectTo:'/home',pathMatch:'full'   },
 { path: 'create', component:CreateProductComponent },
 { path:'home', component:ProductsListComponent },
 { path:'edit', component:EditProductComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
