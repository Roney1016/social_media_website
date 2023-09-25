const jwt = require('jsonwebtoken');
const User = require('../../../models/user');


module.exports.createSession = async function (req, res) {

    try{
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:'Invaild username or password '
            })
        }
        return res.status(200).json({
            message: "sign in successfull, here is your token, please keep it safe !",
            data:{
                token:jwt.sign(user.toJSON(), 'codial' , {expiresIn: '10000'})
            }
        })

    }catch(error){
        console.error('Error:', err);
        return res.status(500).send('Internal Server Error');
    }

}