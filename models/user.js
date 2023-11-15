
import mongoose from 'mongoose';
import Counter from './counter.js';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        id:{
            type:Number,
        },

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
userSchema.pre('save', async function (next) {
    if (!this.id) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: 'entityId' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        this.id = counter.seq;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });

export default model('User', userSchema);