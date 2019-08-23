const { Schema, model } = require('mongoose');
var validate = require('mongoose-validator');

function arrayLimit(val) {
    return val.length <= 10;
  };

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
    },
    tags: {
        type: [String],
        validate: [arrayLimit, 'Tags limited to 10']
    },
    authorId: {
        type: String,
        required: true
    }
  });

module.exports = model('Post', PostSchema);