import mongoose from "mongoose";
import Product from "../models/product.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in getting products", error.message);
        res.status(500).json({ success: false, message: "Some error occured" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; //user send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }
    const newProduct = Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        conole.error("Error in Creating Product", error.message);
        res.status(500).json({success: false, message: "Some error occured"});
    }
};

export const updateProduct =  async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid product id'});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Some error occured" });
    }
};

export const deleteProduct =  async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid product id'});
    }
    try {
        await Product.findByIdAndRemove(id);
        res.status(200).json({ success: true, message: "Product removed" });
    } catch (error) {
        console.log("Error in deleting product", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
