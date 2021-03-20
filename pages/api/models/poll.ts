import mongoose, { model, Schema, Model, Document } from "mongoose";

interface IChoice {
    name: string;
    count: number;
    voters: Array<string>;
}

interface IPoll extends Document {
    startDate: Date;
    title: string;
    question: string;
    creator: string;
    choices: Array<IChoice>;
    endDate: Date;
}


const pollSchema = new Schema({
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

const Poll: Model<IPoll> = mongoose.models.Poll || model<IPoll>("Poll", pollSchema);

export default Poll;