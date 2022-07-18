import { Injectable, NotFoundException } from "@nestjs/common";
import { timeLog } from "console";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
   private products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    }

    fetchProducts(){
        return [...this.products];
    }

    getSingleProduct(productId: string){
        const product = this.findProduct(productId)[0];
        return{...product};
    }

    updateProduct(productId: string,title: string, description: string, price: number){
        const [product, index] = this.findProduct(productId);
        const updateProduct = {...product};
        if(title)
        {
            updateProduct.title = title;
        }
        if(description){
            updateProduct.description = description;
        }
        if(price){
            updateProduct.price = price;
        }
        this.products[index] = updateProduct;
    }

    deleteProduct(prodId){
           const index = this.findProduct(prodId)[1]; 
           this.products.splice(index, 1);

    }

    private findProduct(id:string) : [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if(!product)
        {
            throw new NotFoundException('Could not Find Product');
        }

        return [product, productIndex];
    }

   
}