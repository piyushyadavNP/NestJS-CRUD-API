import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {

    constructor(private readonly productsService: ProductService) { }

    @Post()
    addProduct(@Body('title') prodTitle: string, @Body('description') prodDescription: string, @Body('price') prodPrice: number): any {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
        return { id: generatedId };
    }
    
    @Get()
    getAllProducts(){
        return this.productsService.fetchProducts();
    }

    @Get(':id')
    getSingleProduct(@Param('id') prodId:string){
       return this.productsService.getSingleProduct(prodId);
    }
      
    @Patch(':id')
    updateProduct(@Param('id') prodId:string, @Body('title') prodTitle:string, 
    @Body('description') prodDescription:string,  @Body('price') prodPrice:number,){
        this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId:string){
        this.productsService.deleteProduct(prodId);
        return null;
    }

}