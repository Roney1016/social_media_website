const express = require('express');
const cookieParser = require('cookie-parser');// require cookies parser (req.cookies)
const db = require('./config/mongoose')
const port = process.env.PORT || 3000;
const app = express();

const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts);
// body parser
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// app.get('/',function(req,res){
//     // return res.render('home',{heading:'hello sever'});
//     return res.send('hello buddy !')
// })

app.use('/', require('./routes/index.js'))

app.listen(port, function (err) {
    if (err) {
        console.log(`error in running ther sever ${err}`)
    }
    console.log(`sever is running on the port : ${port}`)
})