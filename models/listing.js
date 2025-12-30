const mongoose = require('mongoose');
const Review = require('./review');

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    location: String,
    country: String,
    category: String,
    image: {
        url: String,
        filename: String
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

listingSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({
            _id: { $in: doc.reviews }
        });
    }
});

module.exports = mongoose.model('Listing', listingSchema);
