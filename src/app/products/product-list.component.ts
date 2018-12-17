import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

    constructor(private productService: ProductService) {
        //this.listFilter = 'cart';
    }

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    //listFilter: string = 'cart';
    errorMessage: string;

    _listFilter: string;
    get listFilter() {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];

    products: IProduct[] = [];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('In onInit');
        //this.products = this.productService.getProducts();
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products
            },
            error => this.errorMessage = <any>error
        );
        //this.filteredProducts = this.products;
       // console.log(this.products)
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        console.log(filterBy);
        console.log(this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1))
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List ' + message;
    }
}