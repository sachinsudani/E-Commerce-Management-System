import { Request, Response } from "express";
import Product from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const {description, price, stock, name } = req.body;
        const product = new Product({
            description,
            price,
            stock,
            name
        })

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
    }
}

export const getAllProduct = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();

        products.length > 0
            ? res.json(products)
            : res.status(404).json({msg: "No products found"});
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const {description, price, stock, name } = req.body;
        const updateProduct = await Product.findByIdAndUpdate(
            { _id: req.params.id }, 
            {
            description,
            price,
            stock,
            name
        })

        updateProduct
            ? res.json(updateProduct)
            : res.status(404).json({msg: "Product not found"});
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete({ _id : req.params.id});

        deleteProduct
            ? res.json({msg: "Product deleted"})
            : res.status(404).json({msg: "Product not found"});
    } catch (error) {
        console.log(error);
    }
}
