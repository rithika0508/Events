const Event = require("../models/Events");
const ErrorResponse = require("../utils/errorResponse");
exports.createEvent = async (req, res, next) => {
    try {
    const event = await Event.findOne({
        email: req.user.email
    })
    const event_obj = {
        eventTitle: req.body.title,
        eventDescription: req.body.description,
        timestamp: Date.now()
    }
    event.createdEvents.push(event_obj)
    await event.save()
    res.status(201).json({
        success: true,
        event
    })
    } catch(error) {
        next(new ErrorResponse("Unable to create Event", 400))
    }
}

exports.getAllEvents = async (req, res, next) => {
    try {
        const event = await Event.findOne({
            email: req.user.email
        })
        res.status(200).json({
            success: true,
            data: event.createdEvents
        })
    } catch(err) {
        next(new ErrorResponse("Unable to Fetch", 400))
    }
}

exports.createInvitedEvents = async (req, res, next) => {
    try {
        //const {invitedUserEmail, eventTitle, eventDescription} = req.body
        const event = await Event.findOne({
            email: req.body.invitedUserEmail
        })
        if(!event) {
            return next(new ErrorResponse("No such User to invite", 400))
        }
        const event_obj = {
            creator:req.user.email,
            eventTitle: req.body.eventTitle,
            eventDescription: req.body.eventDescription,
            timestamp: Date.now()
        }
        event.invitedEvents.push(event_obj)
        await event.save()
        res.status(201).json({
            success: true,
            data: "Event Successfully invited"
        })
    } catch(error) {
        next(new ErrorResponse("Unable to invite", 400))
    }
}

exports.getInvitedEvents = async (req, res, next) => {
    try {
        const event = await Event.findOne({
            email: req.user.email
        })
        res.status(200).json({
            success: true,
            data: event.invitedEvents
        })
    } catch(error) {
        next(new ErrorResponse("Unable to Fetch", 400))
    }
}


// exports.sortByText = async (req, res, next) => {
//     	try {
//             console.log(req.params)
//         } catch (error) {
            
//         }
// }