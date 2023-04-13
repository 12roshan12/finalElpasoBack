const mongoose = require('mongoose');

const Booking_schema = new mongoose.Schema({
    packageId: String,
    packageName: String,
    userId: String,
    name: String,
    email: String,
    contactnumber: String,
    totalTraveller: String,
    date: Date,
    address: { type: String, default: "Nepal" },
    price: String,
    message: String,
    status: { type: Number, default: 0 },
    visited: { type: Boolean, default: false },
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const Booking_model = mongoose.models.Booking || mongoose.model('Booking', Booking_schema);

const NewBookingModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            Booking_table = new Booking_model(req.body)
            Booking_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data })
            })
        }
        else {
            Booking_model.findByIdAndUpdate({ _id: req.body.id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Booking Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: 'Booking Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllBookingModel = (req) => {
    return new Promise((resolve, reject) => {
        Booking_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}

const GetAllBookingByUserModel = (req) => {
    return new Promise((resolve, reject) => {
        Booking_model.find({ "userId" : req.params.user }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const BookingDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        Booking_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Booking Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Booking Successfully  Deleted" })
                }
            }
        })
    })
}

module.exports = { NewBookingModel, BookingDeleteModel, GetAllBookingModel,GetAllBookingByUserModel,Booking_model}