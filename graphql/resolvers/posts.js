const Post = require('../../models/Post');
const { checkAuth } = require('../../utils/auth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                // get posts by desc order
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                }
                else {
                    throw new Error('Post not found');
                }
            }
            catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context);

            // Proceed with creating Post
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();
            return post;
        }
    }
};