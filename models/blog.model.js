const mongoose = require('mongoose');

const Blog_schema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    trip: { type: String },
    author: {
        name: { type: String, required: true },
        image: { type: String, required: true },
        profession: { type: String, required: true },
    },
    views: { type: Number, default: 0 },
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const Blog_model = mongoose.model('Blog', Blog_schema)

const NewBlogModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            Blog_table = new Blog_model(req.body)
            Blog_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data, message: "Blog Added Successfully" })
            })
        }
        else {
            Blog_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Blog Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: null, message: "Blog Updated Successfully" })
                    }
                }
            })
        }

    })
}

const GetAllBlogModel = (req) => {
    return new Promise((resolve, reject) => {
        Blog_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const BlogDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        Blog_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Blog Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Blog Successfully  Deleted" })
                }
            }
        })
    })
}

const GetAllBlogByUserModel = (req) => {
    return new Promise((resolve, reject) => {
        Blog_model.find({ "author.name" : req.params.user }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}

const GetAllBlogByIdModel = (req) => {
    return new Promise((resolve, reject) => {
        Blog_model.find({ _id: req.params.id }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}

module.exports = { NewBlogModel, BlogDeleteModel, GetAllBlogModel, GetAllBlogByUserModel, GetAllBlogByIdModel }