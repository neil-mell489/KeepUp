const db = require("../models/Contact");

const getContacts = async (req, res) => {
    try {
        const contacts = await db.Contact.find({ createdBy: req.params.id });
        res.status(200).json({ data: contacts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createContact = async (req, res) => {
    try {
        const newContact = await db.Contact.create(req.body);
        if (newContact) {
            res.status(201).json({ data: newContact, message: "Contact Created" });
        } else {
            res.status(400).json({ message: "Could not create contact" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const updatedContact = await db.Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) {
            res.status(400).json({ message: "Could not update contact" });
        } else {
            res.status(200).json({ data: updatedContact, message: "Contact updated" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const deletedContact = await db.Contact.findByIdAndDelete(req.params.id);
        if (deletedContact) {
            res.status(200).json({ data: deletedContact, message: "Contact deleted" });
        } else {
            res.status(400).json({ message: "Could not delete contact" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact
};
