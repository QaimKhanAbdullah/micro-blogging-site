const Post = require('../database/models/Post');
module.exports = async (req , resp)=>{
    const posts =  await Post.find({}).populate('author');
    //resp.sendFile(path.resolve(__dirname,'pages/index.html'));
    console.log(posts);
    resp.render('index',{
        posts
    });
};