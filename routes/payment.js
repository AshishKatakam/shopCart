const express=require('express');
const router=express.Router();
const user=require('../models/user');
const jsSHA=require('jssha');
const uniqid=require('uniqid');
const { isLoggedIn } = require('../middleware');
const request=require('request');


router.post('/payment_gateway/payumoney',isLoggedIn,async(req,res)=>{
    let pay = {};
    pay.amount           = req.body.amount;
    pay.productinfo      = "Payment for billing";
    pay.username         = req.body.username;
    pay.txnid            = uniqid.process();
    pay.firstname        = req.user.firstName;
    pay.email            = req.user.email;
    pay.udf1             = req.user.lastName;
    pay.udf2             = req.user.contactnumber;
    pay.service_provider = "payu_paisa";
});

const hashString = '0zgBC7' 
    + '|' + pay.txnid 
    + '|' + pay.amount 
    + '|' + pay.productinfo 
    + '|' + pay.firstname 
    + '|' + pay.email 
    + '|' + pay.udf1
    + '|' + pay.udf2
    + '|' + '||||||||' 
    + 'BHIRG4VR';
const sha = new jsSHA('SHA-512', "TEXT");
sha.update(hashString);
const hash = sha.getHash("HEX");

pay.key='0zgBC7';
pay.surl = '/payment/success/'+doc_id+"/"+pat_id+"/"+meet_id;
pay.furl = '/payment/fail';
pay.hash = hash;

//making a HTTP/HTTPS call with request

request.post({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    url: 'https://sandboxsecure.payu.in/_payment', //Testing url
    form: pay
    }, function (error, httpRes, body) {
   if (error) 
    res.send(
    {status: false, 
    message:error.toString()
    }
    );
   if (httpRes.statusCode === 200) {
    res.send(body);
    } else if (httpRes.statusCode >= 300 && 
    httpRes.statusCode <= 400) {
    res.redirect(httpRes.headers.location.toString());
    }
});

router.post('/payment/success', (req, res) => {
     res.send(req.body);
});

route.post('/payment/fail', (req, res) => {
     res.send(req.body);
});
