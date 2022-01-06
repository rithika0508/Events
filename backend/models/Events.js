const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    createdEvents: [{
        eventTitle: String,
        eventDescription: String,
        timestamp: Number
    }],
    invitedEvents: [{
        creator: String,
        eventTitle: String,
        eventDescription: String,
        timestamp: Number
    }],
    email: {
        type: String,
        required: true
    }
})

const Event = mongoose.model("Event", EventSchema)
module.exports = Event