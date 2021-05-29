const express=require('express');
const router=express.Router();
const {isLoggedIn}=require('../middleware');
const Product=require('../models/product');
const User=require('../models/user');

router.get('/user/:id/cart',isLoggedIn,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id).populate('cart');
        const cart=user.cart;
        res.render('cart/display',{cart});
    }catch(e){
        req.flash('error','unable to get cart');
        res.redirect('error');
    }
    
});

router.post('/user/:id/cart',isLoggedIn,async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        const user=req.user;
        user.cart.push(product);
        await user.save();
        req.flash('success','Added to cart successfully');   
        res.redirect(`/products/${req.params.id}`);
    }catch(e){
        req.flash('error','unable to add product');
        res.redirect('error');
    }
});

router.delete('/user/:userId/cart/:productId',isLoggedIn,async(req,res)=>{
    try{
        const{userId,productId}=req.params;
        await User.findByIdAndUpdate(userId,{$pull:{cart:productId}});
        req.flash('success','Product removed successfully');
        res.redirect(`/user/${userId}/cart`);

    }catch(e){
        req.flash('error','unable to remove the product');
        res.redirect('error');
    }
});
    
router.get('/user/payment',isLoggedIn,async(req,res)=>{
    res.render('paypage/payment');
})


module.exports=router;