import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  //selector: 'pm-product-detail', not needed because is not nested component
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: Product;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');// the + is a shortcut to convert string to number
    this.pageTitle += `: ${id}`;
    this.product = {
      "id": id,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2016",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    };

  }
  onBack(): void {
    this.router.navigate(['/products']);
  }

}
