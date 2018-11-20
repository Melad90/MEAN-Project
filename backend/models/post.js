const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    rubrik: { type: String, required: true },
    ingress: { type: String, required: true },
    innehall: {type: String, required: true },
    imagePath: {type: String, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
module.exports = mongoose.model('Post', postSchema);