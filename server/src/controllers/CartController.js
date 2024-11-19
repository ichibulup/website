const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem');
const { where } = require('sequelize');
class CartController {

    // async loadCart(req, res) {
    //     // const { idCart } = req.params; 
    //     try {
    //         const cart = await Cart.findAll();
    //         res.status(200).json(cart);
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error fetching products', error });
    //     }
    // }

    async loadCartById(req,res){
        const { idCart } = req.params; 
        try {
            const cart = await CartItem.findAll(
                {
                    where: {
                        idcart: idCart
                    }
                }
            );
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    async LoadCart(req,res){
        try {
            const  id  = req.user.id;
            console.log(id,  req.user.id);
            const cart = await Cart.findOne({
                where: {
                    idaccount: id
                }
            })
            res.status(200).json(cart);

        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }

    }
    async loadCartItem(req,res){
        const { idCart } = req.params; 
        try {
            const cart_item = await CartItem.findAll(
                {
                    where: {
                        idcart: idCart
                    }
                }
            );
            res.status(200).json(cart_item);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    async addCartItem(req, res) {
        const { idcart, idproduct, quantity,idcolor, idconfiguration } = req.body;  // Nhận thông tin từ yêu cầu
            console.log(req.body)
        try {
            // Tạo một mục mới trong bảng CartItem
            const newCartItem = await CartItem.create({
                idcart: idcart,
                idproduct: idproduct,
                quantity: quantity,
                idcolor: idcolor,
                idconfiguration:idconfiguration,
            });
    
            res.status(201).json({
                message: 'Cart item added successfully',
                cartItem: newCartItem
            });
        } catch (error) {
            res.status(500).json({ message: 'Error adding cart item', error });
        }
    }

    async removeCartItem(req, res) {
        const { idcartItem } = req.body;  // Nhận thông tin từ yêu cầu
            console.log(req.body)
        try {
            // Tạo một mục mới trong bảng CartItem
            const cartItem = await CartItem.findOne(
                {
                    where:{
                        idcart_item: idcartItem
                    }
                }
            )
            await cartItem.destroy()
    
            res.status(201).json({
                message: 'Cart item remove successfully',
                cartItem: cartItem
            });
        } catch (error) {
            res.status(500).json({ message: 'Error adding cart item', error });
        }
    }

    async updateCartItemQuantity(req, res) {
        const { idcartItem, quantity } = req.body;  // Receive item ID and new quantity from the request
        console.log(req.body);
    
        try {
            // Find the cart item by its ID
            const cartItem = await CartItem.findOne({
                where: {
                    idcart_item: idcartItem
                }
            });
    
            // Check if the cart item exists
            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
    
            // Update the quantity of the cart item
            cartItem.quantity = quantity;
            await cartItem.save();  // Save the updated item to the database
    
            res.status(200).json({
                message: 'Cart item quantity updated successfully',
                cartItem: cartItem
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating cart item quantity', error });
        }
    }
    
    
    


}

module.exports = new CartController();
