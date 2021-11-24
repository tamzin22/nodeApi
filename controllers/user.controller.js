const bcrypt = require('bcrypt');
const userService = require('../services/users.services');

exports.register = (req,res,next)=>{
    const salt = bcrypt.genSaltSync(10);
    const email = req.body.email;
    const password = req.body.password;

    const encrypedPassword = bcrypt.hashSync(password, salt);

    userService.register({email, password: encrypedPassword}, (error,result)=>{
        if(error) {
            return next(error);
        }
        return res.json({
            message: 'Success',
            data: result
        })
    });

    // save user with encrypted password;




    //res.json(req.body)

    // const {password} = req.body;
    // const salt = bcrypt.genSaltSync(10);

    // req.body.password = bcrypt.hashSync(password,salt);

    // userService.register(req,res,(error,result)=>{
    //     if(err){
    //         return next(error);
    //     }
    //     return res.status(200).send({
    //         message: "Success",
    //         data : result,
    //     });
    // });
}

exports.login = (req,res,next) => {
    const {email,password} = req.body;

    userService.login({email,password},(error,result, token)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data : {
                result, 
                token
            }
        });
    });
}

exports.userProfile = (req,res,next) =>{
    return res.status(200).json({message : 'Authorized User'});
}