const Post = require('../database/models/Post');
module.exports = async(req ,res)=>{
    const post = await Post.findById(req.params.id).populate('author');
    //resp.sendFile(path.resolve(__dirname,'pages/post.html'));
    console.log(req.params);
    resp.render('post', {
        post
    });
};