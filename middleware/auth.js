const user = require('../database/models/User');
module.exports = (req , res, next)=>{
user.findById(req.session.userId,(error, user)=>{
    if(error|| !user){
        return res.redirect('/');

    }
    next();
    
})

}