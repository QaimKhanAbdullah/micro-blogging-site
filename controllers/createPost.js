module.exports = (req ,resp)=>{
    if(req.session.userId){
        return resp.render('create');
    }
    else{
        resp.redirect('/auth/login');
    }    
};