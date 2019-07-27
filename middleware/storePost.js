module.exports = (req,resp,next)=>{

    if(!req.files.image || !req.body.subtitle || !req.body.content){
        return resp.redirect('/posts/new');
    }
    next();
};