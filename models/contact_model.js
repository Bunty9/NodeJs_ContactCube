const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    owner:{ type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true,
});

const Contact = mongoose.model('Contact',ContactSchema);

module.exports = Contact;
