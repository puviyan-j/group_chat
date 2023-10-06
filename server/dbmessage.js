const mongoose = require("mongoose")

const messageschema = new mongoose.Schema(
    {
        name:String,
        message:String,
        roomid:String,
        uid:String,
        time:String,
    },
    {
        timestamps:true
    })

    const messages = mongoose.model("message",messageschema);
    module.exports = messages