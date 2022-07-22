import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    try {
      const newProduct = await this.productModel.create({
        title,
        description,
        price,
      });
      // await newProduct.save();
      console.log(newProduct);
      return newProduct.id as string;
    } catch (e) {
      console.log(e.message);
    }
  }

  async fetchProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updateProduct = await this.findProduct(productId);

    if (title) {
      updateProduct.title = title;
    }
    if (description) {
      updateProduct.description = description;
    }
    if (price) {
      updateProduct.price = price;
    }
    updateProduct.save();
  }

  async deleteProduct(prodId) {
    try {
      await this.productModel.findByIdAndRemove(prodId);
    } catch (e) {
      throw new NotFoundException('Could Not Find Product');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not Find Product');
    }
    if (!product) {
      throw new NotFoundException('Could not Find Product');
    }
    return product;
  }
}
