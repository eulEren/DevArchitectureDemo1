import { Component, OnInit } from '@angular/core';
import { Product } from 'app/core/models/product';
import { ProductService } from 'app/core/services/product.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { AuthService } from '../admin/login/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ColorComponent } from 'app/core/components/color/color.component';

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {

    products: Product[] = [];
    productName: string = "";
    productColorId: number = 0;
    productSize: string = "";
    selectedProduct: Product = new Product();

    constructor(
        private productService: ProductService,
        private alertifyService: AlertifyService,
        private authService: AuthService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.productService.getProducts().subscribe(data => {
            this.products = data;
        }, error => {
            this.alertifyService.error("Ürünler getirilemedi");
        });
    }

    addProduct() {
        var product = new Product();

        product.name = this.productName;
        product.colorId = this.productColorId;
        product.size = this.productSize;
        product.createdUserId = this.authService.getCurrentUserId();
        product.createdDate = new Date();
        product.lastUpdatedUserId = this.authService.getCurrentUserId();
        product.lastUpdatedDate = new Date();
        product.status = true;
        product.isDeleted = false;

        this.productService.add(product).subscribe(data => {
            this.alertifyService.success("Ürün Eklendi");
            this.productName = "";
            this.productColorId = 0;
            this.productSize = "";
            this.getProducts();
        }, error => {
            this.alertifyService.error("Ürün Eklenemedi");
        });
    }

    selectProduct(product: Product) {
        this.selectedProduct = product;
        this.productName = product.name;
        this.productColorId = product.colorId;
        this.productSize = product.size;
    }

    updateProduct() {
        if (this.selectedProduct.id == 0) {
            this.alertifyService.warning("Güncellenecek Ürünü Seç");
            return;
        }

        this.selectedProduct.name = this.productName;
        this.selectedProduct.colorId = this.productColorId;
        this.selectedProduct.size = this.productSize;
        this.selectedProduct.lastUpdatedUserId = this.authService.getCurrentUserId();
        this.selectedProduct.lastUpdatedDate = new Date();

        this.productService.update(this.selectedProduct).subscribe(data => {
            this.alertifyService.success("Ürün Güncellendi");
            this.productName = "";
            this.productColorId = 0;
            this.productSize = "";
            this.selectedProduct = new Product();
            this.getProducts();
        }, error => {
            this.alertifyService.error("Ürün Güncellenemedi");
        });
    }

    deleteProduct(product: Product) {
        this.productService.delete(product.id).subscribe(data => {
            this.alertifyService.success("Ürün Silindi");
            this.getProducts();
        }, error => {
            this.alertifyService.error("Ürün Silinemedi");
        });
    }

    openColorDialog() {
        this.dialog.open(ColorComponent);
    }

}