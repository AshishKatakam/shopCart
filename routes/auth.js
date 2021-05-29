const express=require('express');
const router=express.Router();
const User=require('../models/user');
const passport=require('passport');

router.get('/signup',async(req,res)=>{
    res.render('auth/signup');
});

router.post('/signup',async(req,res)=>{
    try{
            const user=new User({
            username:req.body.username,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            contactnumber:req.body.contactnumber,
            email:req.body.email
    });
        await User.register(user,req.body.password);
        req.flash('success','Account registration successful');
        res.redirect('/login');
    }catch(e){
        console.log(e.message);
        req.flash('error',e.message);
        res.redirect('/signup');
    }
});

router.get('/login',async(req,res)=>{
    res.render('auth/login');
});

router.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            failureFlash: true
        }
    ), (req, res) => {
        req.flash('success',`Welcome ${req.user.username}`);
        res.redirect('/products');
});

router.get('/logout',async(req,res)=>{
    req.logout();
    req.flash('success','Logged out successfully');
    res.redirect('/login');
});

module.exports=router;