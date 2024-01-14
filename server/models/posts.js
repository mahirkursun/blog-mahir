import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    tag: String,
    image: String,
    // likeCount: {
    //     type: Number,
    //     default: 0
    // },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const Post = mongoose.model('Post', postSchema);

export default Post;