const express = require('express');
const router = express.Router();
const { Comment, User, Perspective, Article, Vote } = require('../models');

// GET route to fetch comments for an article
router.get('/comments/:articleId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { articleId: req.params.articleId },
            include: {
                model: Perspective,
                as: 'Perspective', // replace 'perspective' with the alias you used when defining the association
                attributes: ['perspectiveName']
            }
        });

        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST route to create a new comment
router.post('/submit_comment', async (req, res) => {
    const { articleId, commentText, userId, perspectiveId } = req.body;

    try {
        // Validate input data
        if (!articleId || !commentText || !userId) {
            return res.status(400).send('Missing required fields');
        }

        const newComment = await Comment.create({
            text: commentText,
            articleId: articleId,
            userId: userId,
            perspectiveId: perspectiveId || null // If perspectiveId is not provided, set it to null
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route to upvote a comment
router.post('/upvote/:commentId', async (req, res) => {
    try {
        const userId = req.session.userId; // replace with how you get the user's ID
        const { commentId } = req.params;

        // Fetch the comment from the database
        const comment = await Comment.findByPk(commentId);

        const existingVote = await Vote.findOne({ where: { userId, commentId } });
        if (existingVote) {
            if (existingVote.is_upvote) {
                // User has already upvoted this comment
                return res.json({ success: false, error: 'You have already upvoted this comment' });
            } else {
                // User has downvoted this comment, so we'll change their vote to an upvote
                existingVote.is_upvote = true;
                await existingVote.save();

                // Decrement downvotes and increment upvotes
                comment.decrement('downvotes');
                comment.increment('upvotes');
            }
        } else {
            // User has not voted on this comment, so we'll create a new upvote
            await Vote.create({ userId, commentId, is_upvote: true });

            // Increment upvotes
            comment.increment('upvotes');
        }

        await comment.save();

        res.json({ success: true, upvotes: comment.upvotes });
    } catch (error) {
        console.error('Error upvoting comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST route to downvote a comment
router.post('/downvote/:commentId', async (req, res) => {
    try {
        const userId = req.session.userId; // replace with how you get the user's ID
        const { commentId } = req.params;

        // Fetch the comment from the database
        const comment = await Comment.findByPk(commentId);

        const existingVote = await Vote.findOne({ where: { userId, commentId } });
        if (existingVote) {
            if (!existingVote.is_upvote) {
                // User has already downvoted this comment
                return res.json({ success: false, error: 'You have already downvoted this comment' });
            } else {
                // User has upvoted this comment, so we'll change their vote to a downvote
                existingVote.is_upvote = false;
                await existingVote.save();

                // Decrement upvotes and increment downvotes
                comment.decrement('upvotes');
                comment.increment('downvotes');
            }
        } else {
            // User has not voted on this comment, so we'll create a new downvote
            await Vote.create({ userId, commentId, is_upvote: false });

            // Increment downvotes
            comment.increment('downvotes');
        }

        await comment.save();

        res.json({ success: true, downvotes: comment.downvotes });
    } catch (error) {
        console.error('Error downvoting comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
