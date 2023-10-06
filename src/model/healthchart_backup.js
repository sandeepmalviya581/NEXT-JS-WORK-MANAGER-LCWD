import mongoose, { Schema } from "mongoose";

const HealthChartBackupSchema = new Schema({
    kapalBhati: {
        type: Boolean,
        default: false
    },
    anulomVilom: {
        type: Boolean,
        default: false
    },
    hotWater: {
        type: Boolean,
        default: false
    },
    exercise: {
        type: Boolean,
        default: false
    },
    morningWalk: {
        type: Boolean,
        default: false
    },
    eveningWalk: {
        type: Boolean,
        default: false
    },
    nightWalk: {
        type: Boolean,
        required: false
    },
    chartDate: {
        type: Date,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now()

    },
    updatedDate: {
        type: Date,
        required: true,
        default: Date.now()

    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    weight: {
        type: String
    },
    amritvela: {
        type: Boolean,
        default: false
    },
    running: {
        type: Boolean,
        default: false
    }



})

export const HealthChartBackup = mongoose.models.healthchartbackup || mongoose.model("healthchartbackup", HealthChartBackupSchema)