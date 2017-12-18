var mongoose = require('mongoose');

module.exports = mongoose.model("Review", {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    subject: { type: String, required: true },
    message: { type: String, default: true },
    lastUpdated: { type: Date, default: Date.now },
});



