const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
const rooms = mongoose.model("room", roomSchema);
module.exports = rooms;