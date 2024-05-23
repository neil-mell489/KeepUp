const mongoose = require("mongoose");


const calendarEventSchema = new mongoose.Schema({
    eventName: { type: String, required: true }, // Matches the 'eventName' input
    description: { type: String, required: true }, // Matches the 'description' input
    date: { type: Date, required: true }, // Matches the 'date' input, ensuring it's required
    time: { type: String, required: true }, // Stores time as String (HH:MM format expected from HTML time input)
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" } // Reference to a 'User' model; adjust "currentUser" if your user model is named differently
});

const Event = mongoose.model("Event", calendarEventSchema);

module.exports = Event;