const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/auth");
const { createEvent, getAllEvents, getInvitedEvents, createInvitedEvents, sortByText } = require("../controllers/events")

router.route("/createEvents").post(protect,createEvent )
router.route("/AllEvents").get(protect, getAllEvents)
router.route("/AllInvitedEvents").get(protect, getInvitedEvents)
router.route("/invite").post(protect, createInvitedEvents)
// router.route("/filterByText/:text").get(protect, sortByText)
module.exports = router