import { Injectable, NotFoundException } from "@nestjs/common";
import { timeLog } from "console";
import { Product } from "./product.model";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductService {
   private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

    async insertProduct(title: string, description: string, price: number) {
       try{ 
        const newProduct = await this.productModel.create({title, description, price});
        // await newProduct.save();
        console.log(newProduct);
         return newProduct.id as string;
       }
       catch(e)
       {
        console.log(e.message);
       }
    
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