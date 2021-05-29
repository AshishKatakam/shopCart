//used packages
if(process.env.NODE_ENV!=='production'){
  require('dotenv').config();
}
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const seedDB=require('./seed');//this is not a package
const methodOverride = require('method-override');
const session=require('express-session');
const flash=require('connect-flash');
const passport = require('passport');
const localStrategy=require('passport-local');
const User=require('./models/user');

//routes
const productRoutes=require('./routes/product');
const authRoutes=require('./routes/auth');
const cartRoutes=require('./routes/cart');


mongoose.connect(process.env.DB_URL, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
  })
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log("connection error");
    console.log(err);
});

// seedDB();


//used middlewares
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
const sessionConfig= {
    secret:'Do not tell anyone this secret',
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionConfig));
app.use(flash());


//initializing passport and sessions to store users info
app.use(passport.initialize());
app.use(passport.session());

//configuring passport to use local strategy
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function (req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser=req.user;
    next();
  });




app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.get('/',(req,res)=>{
    res.render('landing');
});






app.listen(process.env.PORT || 3000,()=>{
    console.log("server running on port 3000");
})