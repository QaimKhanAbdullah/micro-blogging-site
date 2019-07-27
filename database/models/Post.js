const mongoose =  require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User', //referencing the post with the userid in the User document
        required:true
    },
    image: String,
    createdAt: {
        type: Date,
        default: new Date()

    }
});

const Post = mongoose.model('Post',PostSchema);

module.exports = Post;
