import mongoose, { Schema } from "mongoose";
import modelOption from "./model.options.js";

export default mongoose.model(
    "Favorite",
    mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        mediaType: {
            type: String,
            enum: ["tv", "movie"],
            required: true,
        },
        mediaId: {
            type: String,
            required: true,
        },
        mediaTitle: {
            type: String,
            required: true,
        },
        mediaPoster: {
            type: String,
            required: true,
        },
        mediaRate: {
            type: Number,
            required: true,
        },
    }, modelOption),
);