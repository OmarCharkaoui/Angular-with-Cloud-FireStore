import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  dataProducts: Product[] = [];
  dataSource:MatTableDataSource<Product>;

 
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 
  constructor(private _serviceProduct: ProductService,private _router:Router,
    private toastr:ToastrService) { 

   
  }
  ngOnInit() {
    this._serviceProduct.getProducts().subscribe(data => {
      this.dataProducts = data.map((e) => {

        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Product
        
      })
      this.dataSource = new MatTableDataSource(this.dataProducts),
    this.dataSource.sort = this.sort,
    this.dataSource.paginator = this.paginator;
    });
   

   
  
  }
  //Angular Material Table
  displayedColumns: string[] = ['title', 'author', 'price', 'description','action'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  getTotalPrice() {

    return this.dataProducts.map(x=>x.price).reduce((x:number,y:number)=>x+y,0);
  }

  onDelete(id: string){
    if(confirm("are you sure to delete this record ?"))
    {
    this._serviceProduct.deleteProduct(id);
    this.toastr.error("Deleted successfully","Product");
    }
  }

}

