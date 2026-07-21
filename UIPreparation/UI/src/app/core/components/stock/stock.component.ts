import { Component, OnInit } from '@angular/core';
import { Stock } from 'app/core/models/stock';
import { StockService } from 'app/core/services/stock.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { AuthService } from '../admin/login/services/auth.service';
import { Product } from 'app/core/models/product';
import { ProductService } from 'app/core/services/product.service';

@Component({
    selector: "app-stock",
    templateUrl: "./stock.component.html",
    styleUrls: ["./stock.component.css"]
})
export class StockComponent implements OnInit {

    stocks: Stock[] = [];
    products: Product[] = [];
    stockProductId: number = 0;
    stockQuantity: number = 0;
    stockIsReadyForSale: boolean = false;
    selectedStock: Stock = new Stock();

    constructor(
        private stockService: StockService,
        private productService: ProductService,
        private alertifyService: AlertifyService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.getStocks();
        this.getProducts();
    }

    getStocks() {
        this.stockService.getStocks().subscribe(data => {
            this.stocks = data;
        }, error => {
            this.alertifyService.error("Stoklar getirilemedi");
        });
    }

    getProducts() {
        this.productService.getProducts().subscribe(data => {
            this.products = data;
        }, error => {
            this.alertifyService.error("Ürünler getirilemedi");
        });
    }

    addStock() {
        var stock = new Stock();

        stock.productId = this.stockProductId;
        stock.quantity = this.stockQuantity;
        stock.isReadyForSale = this.stockIsReadyForSale;
        stock.createdUserId = this.authService.getCurrentUserId();
        stock.createdDate = new Date();
        stock.lastUpdatedUserId = this.authService.getCurrentUserId();
        stock.lastUpdatedDate = new Date();
        stock.status = true;
        stock.isDeleted = false;

        this.stockService.add(stock).subscribe(data => {
            this.alertifyService.success("Stok eklendi");
            this.stockProductId = 0;
            this.stockQuantity = 0;
            this.stockIsReadyForSale = false;
            this.getStocks();
        }, error => {
            this.alertifyService.error("Stok eklenemedi");
        });
    }

    selectStock(stock: Stock) {
        this.selectedStock = stock;
        this.stockProductId = stock.productId;
        this.stockQuantity = stock.quantity;
        this.stockIsReadyForSale = stock.isReadyForSale;
    }

    updateStock() {
        if (this.selectedStock.id == 0) {
            this.alertifyService.warning("Güncellenecek stoğu seçiniz");
            return;
        }

        this.selectedStock.productId = this.stockProductId;
        this.selectedStock.quantity = this.stockQuantity;
        this.selectedStock.isReadyForSale = this.stockIsReadyForSale;
        this.selectedStock.lastUpdatedUserId = this.authService.getCurrentUserId();
        this.selectedStock.lastUpdatedDate = new Date();

        this.stockService.update(this.selectedStock).subscribe(data => {
            this.alertifyService.success("Stok güncellendi");
            this.stockProductId = 0;
            this.stockQuantity = 0;
            this.stockIsReadyForSale = false;
            this.selectedStock = new Stock();
            this.getStocks();
        }, error => {
            this.alertifyService.error("Stok güncellenemedi");
        });
    }

    deleteStock(stock: Stock) {
        this.stockService.delete(stock.id).subscribe(data => {
            this.alertifyService.success("Stok silindi");
            this.getStocks();
        }, error => {
            this.alertifyService.error("Stok silinemedi");
        });
    }

    getProductName(productId: number): string {
        var product = this.products.find(p => p.id == productId);
        return product ? product.name : "Ürün silinmiş";
    }

}