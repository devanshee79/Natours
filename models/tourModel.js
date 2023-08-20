const { default: mongoose } = require("mongoose")

const tourSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'A tour must have a name'],
        trime: true,
        unique: true
    },duration:{
        type:Number,
        required: [true, 'A tour nust hace a duration']
    },
    maxGroupSize:{
        type: Number,
        rerquired:[true, 'There must be a group size']
    },
    difficulty:{
        type: String,
        required:[true, 'There must be some difficulty level']
    },
    ratingAverage: {
        type: Number,
        default: 3.5
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required: [true, 'A tour nust have some price assocciated with it.']
    },
    priceDiscount: Number,
    summary:{
        type: String, 
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description:{
        type: String,
        trim: true,
        required:[true, 'A tour must have a description']
    },
    imageCover:{
        type:String,
        required:[true, 'A tour must have an image']
    },
    images: [String],
    createdAt:{
        type: Date,
        default: Date.now()    
    },
    startDates:[Date]

})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;