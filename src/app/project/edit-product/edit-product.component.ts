import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productUser :Product = {
    id:null,
    title: '',
    description: '',
    author: '',
    price: null
  };
  idParam:string;

  constructor(private _serviceProduct: ProductService, private _router:Router,
    private _routeActive: ActivatedRoute, private toastr:ToastrService) { }
   
  ngOnInit() {
    // this._routeActive.queryParams.subscribe(x=>{
    //   this.idParam =  x.id});
    this.idParam =  this._routeActive.snapshot.queryParams['id'];


  this._serviceProduct.getProductbyId(this.idParam).subscribe(x=> this.productUser = x);
 
}
  onEdit()
  {
   
    this._serviceProduct.updateProduct(this.productUser,this.productUser.id);
    this.toastr.info("Edited successfully","Product");
    this._router.navigate(['/home']);
  }

}
