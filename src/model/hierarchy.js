import mongoose, { Schema } from "mongoose";

const HierarchySchema = new Schema({
    levelNumber: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now()

    },
    updatedDate: {
        type: Date,
    },

    createdBy: {
        type: String,
        required: true,
    },

    updatedBy: {
        type: String,
    },

    unique_id: {
        type: String,
        required: true,
    },

    parent_id: {
        type: String,
    }
})

HierarchySchema.add({
    hierarchyList: [HierarchySchema] // Array of documents of the same schema (HierarchySchema)
});


export const Hierarchy = mongoose.models.hierarchy || mongoose.model("hierarchy", HierarchySchema)