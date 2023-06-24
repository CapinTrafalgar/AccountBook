const mongoose = require('mongoose')
// 创建文档的结构对象
let AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    time: {
        type: Date,
        required:true
    },
    type: {
        type: Number,
        default: -1,
        required:true
    },
    account: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: false
    }
})
// 创建模型对象
let AccountModel = mongoose.model('accounts', AccountSchema)

module.exports = AccountModel