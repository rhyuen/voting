const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    startDate: {
        type: Date
    },
    title: String,
    question: String,
    creator: {
        type: String,
        required: true
    },
    choices: [
        {
            name: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                required: true,
                default: 0
            },
            voters: [{
                type: String
            }]
        }
    ],
    endDate: {
        type: Date
    }
}, {
    timestamps: {
        createdAt: "created_at"
    }
});


module.exports = mongoose.models.Poll || mongoose.model("Poll", pollSchema);