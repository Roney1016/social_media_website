const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/college');

const db = mongoose.connection;


db.on('error',console.error.bind(console,'error in connecting to db'));


db.once('open',function(){
    console.log('successfully connected to DB');
})