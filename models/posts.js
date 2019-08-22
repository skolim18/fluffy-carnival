const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now()
    },
    privacyLevel: {
        type: String,
        enum: ['public', 'friendsOnly', 'private'],
        default: 'public'
    },
    state: {
        type: String,
        enum: ['published', 'draft'],
        default: 'draft'
    }
});

module.exports = model('Post', PostSchema);