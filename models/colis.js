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
        destination: {
            type: String,
            required: true
        },
        receiverName: {
            type: String,
            required: true
        },
        receiverPhone: {
            type: String,
            required: true
        },

    }
);
export default model('Colis', colisSchema);