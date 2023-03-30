const mongoose = require('mongoose');

const trip_schema = new mongoose.Schema({
    category: { type: String },
    name: { type: String },
    bannerImage: { type: String },
    tripImage: { type: String },
    video: { type: String },
    imageGallery: [],
    price: { type: String },
    isSpecialOffer: { type: Boolean, default: false },
    offerPrice: String,
    summary: {
        duration: String,
        destination: String,
        startPoint: String,
        endPoint: String,
        groupSize: String,
        maxaltitude: String,
        bestSeason: String,
    },
    description: { type: String },
    itinerary: {
        description: { type: String },
        details: [
            {
                head: { type: String },
                headDetails: { type: String },
            }
        ]
    },
    inclusion: { type: [] },
    exclusion: { type: [] },
    aboutTrip: [
        {
            head: { type: String },
            headDetails: { type: String },
        }
    ],
    faq: [
        {
            head: { type: String },
            headDetails: { type: String },
        }
    ],
    customerReview: [
        {
            userid: String,
            user: String,
            rating: String,
            comment: String,
            postedOn: { type: Date, default: Date.now() },
        }
    ],
    totalViews: { type: Number, default: 500 },
    rating: { type: Number, default: 4.5 },
    status: { type: Boolean, default: true },
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const trip_model = mongoose.model('Trip', trip_schema)

const NewTripModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            trip_table = new trip_model(req.body)
            trip_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data, message: 'Trip added succesfully' })
            })
        }
        else {
            trip_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, message: 'Trip Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, message: 'Trip successfully updated' })
                    }
                }
            })
        }

    })
}

const GetAllTripByIdModel = (req) => {
    return new Promise((resolve, reject) => {
        trip_model.findById({ _id: req.params.id }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}

const GetAllTripModel = (req) => {
    return new Promise((resolve, reject) => {
        trip_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const TripDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        trip_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Trip Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Trip Successfully  Deleted" })
                }
            }
        })
    })
}

module.exports = { NewTripModel, TripDeleteModel, GetAllTripModel, GetAllTripByIdModel }