const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
var validate = require('mongoose-validator');

function arrayLimit(val) {
    return val.length <= 10;
  };

const ImageSchema = mongoose.Schema({
    type: String,
    data: Buffer
    });

mongoose.model('image', ImageSchema, 'image');

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
    },
    image: {
        type: mongoose.Schema.Types.Object,
        ref: 'image'
    }

  });

module.exports = model('Post', PostSchema);