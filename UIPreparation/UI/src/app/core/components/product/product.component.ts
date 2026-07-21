import { Component, OnInit } from '@angular/core';
import { Product } from 'app/core/models/product';
import { ProductService } from 'app/core/services/product.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { AuthService } from '../admin/login/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ColorComponent } from 'app/core/components/color/color.component';
import { Color } from 'app/core/models/color';
import { ColorService } from 'app/core/services/color.service';

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {

    products: Product[] = [];
    colors: Color[] = [];
    productName: string = "";
    productColorId: number = 0;
    productSize: string = "";
    selectedProduct: Product = new Product();

    constructor(
        private productService: ProductService,
        private alertifyService: AlertifyService,
        private authService: AuthService,
        private dialog: MatDialog,
        private colorService: ColorService
    ) { }

    ngOnInit(): void {
        this.getProducts();
        this.getColors();
    }

    getColors() {
        this.colorService.getColors().subscribe(data => {
            this.colors = data;
        }, error => {
            this.alertifyService.error("Renkler getirilemedi");
        });
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
        var dialogRef = this.dialog.open(ColorComponent);

        dialogRef.afterClosed().subscribe(() => {
            this.getColors();
        });
    }

    getColorName(colorId: number): string {
        var color = this.colors.find(c => c.id == colorId);
        return color ? color.name : "";
    }

}