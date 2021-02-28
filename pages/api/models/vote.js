const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    startDate: {
        type: Date
    },
    title: String,
    question: String,
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
            }
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

module.exports = mongoose.models.Vote || mongoose.model("Vote", voteSchema);