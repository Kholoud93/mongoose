import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: function (value) {
            return value !== value.toUpperCase();
        },
        message: "Title must not be entirely uppercase",
    },

    content: {
        type: String,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});

const note = mongoose.model("Note", noteSchema);

export default note;