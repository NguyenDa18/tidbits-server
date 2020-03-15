const Post = require('../../models/Post');
const { UserInputError } = require('apollo-server');
const { checkAuth } = require('../../utils/auth');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment cannot be empty'
                    }
                });
            }

            const post = await Post.findById(postId);
            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            }
            else throw new UserInputError('Post not found');
        }
    }
};