const express = require('express');
const cookieParser = require('cookie-parser');// require cookies parser (req.cookies)
const db = require('./config/mongoose');
const port = process.env.PORT || 3000;
const app = express();

// add static files 
app.use(express.static('assets'))

//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');   // json web token
const MongoStore = require('connect-mongo') ;



// flash message
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts);
// body parser
app.use(express.urlencoded({ extended: true }));

// Make the upload path availabe to the browser
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/college',
       autoRemove:'native',
       
    },
    function(err){
        console.log(err || 'connect-mongodb ok')
    }
    ) 
    
   

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

// app.get('/',function(req,res){
//     // return res.render('home',{heading:'hello sever'});
//     return res.send('hello buddy !')
// })
//use express router
app.use('/', require('./routes/index.js'))



app.listen(port, function (err) {
    if (err) {
        console.log(`error in running ther sever ${err}`)
    }
    console.log(`sever is running on the port : ${port}`)
})