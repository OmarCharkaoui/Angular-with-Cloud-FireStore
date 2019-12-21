import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productUser = {
    id:null,
    title: '',
    description: '',
    author: '',
    price: null
  };

  constructor(private _serviceProduct: ProductService, private _router:Router,
    private _routeActive: ActivatedRoute,private toastr:ToastrService) { }

  ngOnInit() {
 
  };
   
  onSubmit() {
    delete this.productUser.id;
    this._serviceProduct.createProduct(this.productUser);
    this.toastr.success("Inserted successfully","Product");
    this._router.navigate(['/home']);
    
  }


}
