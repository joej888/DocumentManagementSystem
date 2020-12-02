const User = require('../models/user');

exports.getUsers = ((req,res,next)=>{
    User.find()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err=> console.log(err));
});



/**exports.postUser = ((req,res,next) => {
    const user = new User({
        userName : req.body.userName,
        email : req.body.email,
        password: req.body.password
    });
    user.save()
    .then(result =>{
        res.status(200).json({message:'New User Created'});
    })
    .catch(err => console.log(err));

}); *///

