import { Component, OnInit } from '@angular/core';
import { Stock } from 'app/core/models/stock';
import { StockService } from 'app/core/services/stock.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { Product } from 'app/core/models/product';
import { ProductService } from 'app/core/services/product.service';

@Component({
    selector: "app-warehouse-report",
    templateUrl: "./warehouse-report.component.html",
    styleUrls: ["./warehouse-report.component.css"]
})
export class WarehouseReportComponent implements OnInit {

    stocks: Stock[] = [];
    products: Product[] = [];

    constructor(
        private stockService: StockService,
        private productService: ProductService,
        private alertifyService: AlertifyService
    ) { }

    ngOnInit(): void {
        this.getStocks();
        this.getProducts();
    }

    getStocks() {
        this.stockService.getStocks().subscribe(data => {
            this.stocks = data;
        }, error => {
            this.alertifyService.error("Depo Raporu Getirilemedi");
        });
    }

    getProducts() {
        this.productService.getProducts().subscribe(data => {
            this.products = data;
        }, error => {
            this.alertifyService.error("Ürünler getirilemedi");
        });
    }

    getProductName(productId: number): string {
        var product = this.products.find(p => p.id == productId);
        return product ? product.name : "Ürün Silinmiş";
    }

}