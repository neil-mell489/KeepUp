const db = require("../models/Event")



const getEvent = async(req,res) => {
    try{
        const event = await db.Event.find({createdBy: req.params.id})
        res.status(200).json({data: event})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const createEvent = async(req,res) => {
    try{
        console.log(req.body); // Add this line to log the request body
        const newEvent = await db.Event.create(req.body)
        if (newEvent){
            res.status(201).json({data: newEvent, message: "Event Created"})
        } else {
            res.status(400).json({message: "Could not create event"})
        }
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const updateEvent = async (req,res) => {
    try{
        const updatedEvent = await db.Event.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!updatedEvent){
            res.status(400).json({message: "Could not updated event"})
        }else {
            res.status(200).json({data: updatedEvent, message: "Event updated"})
        }
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

const deleteEvent = async (req,res) => {
    try{
        const deletedEvent = await db.Event.findByIdAndDelete(req.params.id)
        if(deletedEvent){
            res.status(200).json({data: deletedEvent, message: "Event deleted"})
        }else{
            res.status(400).json({message: "Could not delete event"})
        }
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
module.exports = {
    getEvent, 
    createEvent,
    updateEvent,
    deleteEvent
}