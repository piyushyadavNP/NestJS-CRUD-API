import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./products.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { productSchema } from "./product.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: productSchema}])],
    controllers : [ProductController],
    providers : [ProductService],
})
export class ProductModule {}