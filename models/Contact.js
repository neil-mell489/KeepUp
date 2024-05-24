const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String },
    mobilePhone: { type: String, required: true },
    workPhone: { type: String },
    email: { type: String, required: true },
    address: { type: String },
    note: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' } // **this refers to the user model. do not delete this note bc you will forget**
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
