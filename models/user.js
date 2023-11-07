
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        Phone_number: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum:['admin','driver','client','delivery man']
        },
        name: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);