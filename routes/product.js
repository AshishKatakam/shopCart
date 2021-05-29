const express=require('express');
const router=express.Router();
const Product=require('../models/product');
const Review = require('../models/review');
const {isLoggedIn}=require('../middleware');


//display all the products
router.get('/products',async(req,res)=>{
    try{
        const products= await Product.find({});
        res.render('products/index',{products});
    }catch(e){
        console.log(e.message);
        req.flash('error','cannot find products');
        res.redirect('/error');
    }
    
});

//form to create a new product
router.get('/products/new',isLoggedIn,async(req,res)=>{
    res.render('products/new');
});

//create a new product
router.post('/products',isLoggedIn,async(req,res)=>{
    try{
        await Product.create(req.body);
        req.flash('success','product is created successfully');
        res.redirect('/products');
    }catch(e){
        console.log(e.message);
        req.flash('error','unable to create product');
    }
   
});

//show particular product
router.get('/products/:id',async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id).populate('reviews');
        res.render('products/show',{product});
    }catch(e){
        console.log(e.message);
        req.flash('error','product cannot be found');
        res.redirect('/error');
    }
    
});

//edit the product
router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        res.render('products/edit',{product});
    }catch(e){
        console.log(e.message);
        req.flash('error','unable to  get edit page');
        res.redirect('/error');
    }
    
});

//updating info
router.patch('/products/:id',isLoggedIn,async(req,res)=>{
    try{
        await Product.findByIdAndUpdate(req.params.id,req.body);
        req.flash('success','product is updated successfully');
        res.redirect(`/products/${req.params.id}`);
    }catch(e){
        console.log(e.message);
        req.flash('error','unable to update the product');
        res.redirect('/error');
    }
    
});

//delete the product
router.delete('/products/:id',isLoggedIn,async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id,req.body);
        req.flash('success','product is deleted successfully');
        res.redirect('/products');
    }catch(e){
        console.log(e.message);
        req.flash('error','unable to delete the product');
        res.redirect('/error');
    }
    
});

//create new comment
router.post("/products/:id/review",isLoggedIn,async(req,res)=>{
    const product=await Product.findById(req.params.id);
    const review=await new Review({
        user:req.user.username,
        ...req.body //using spread operator
    })
    product.reviews.push(review);
    await product.save();
    await review.save();
    res.redirect(`/products/${product._id}`);
});

router.get('/error',(req,res)=>{
    res.render('partials/error');
});
module.exports=router;