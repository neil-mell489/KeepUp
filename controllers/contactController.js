const Contact = require('../models/Contact');

// Get contacts by user ID
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ createdBy: req.params.id });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching contacts' });
    }
};

// Create a new contact
exports.createContact = async (req, res) => {
    try {
        // Extract userId from the request body
        const userId = req.body.createdBy;

        // LOG status of userID
        console.log('userId in createContact:', userId);

        // Create a new contact instance with createdBy field set to userId
        const contact = new Contact({
            ...req.body, // Copy other fields from the request body
            createdBy: userId,
        });

        // Save the contact to the database
        await contact.save();

        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a contact
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
