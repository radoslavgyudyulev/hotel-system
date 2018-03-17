const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


let hotelSchema = mongoose.Schema({
    hotelName: {
         type: String,
         required: true 
    },
    description: { 
         type: String,
         required: true,
         
    },
    postedOn: {
         type: Date, 
         default: Date.now()
    },
    _creator: {
         type: ObjectId,
         ref: 'User'
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stars: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
})

let Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel