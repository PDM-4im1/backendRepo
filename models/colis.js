import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const colisSchema = new Schema(
    {
        height: {
            type: Number,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        adresse: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        receiverName: {
            type: String,
            required: true
        },
        receiverPhone: {
            type: Number,
            required: true
        },

    }
);
export default model('Colis', colisSchema);