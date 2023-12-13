import mongoose from 'mongoose';
import Counter from './counter.js';

const { Schema, model } = mongoose;

const conducteurSchema = new Schema({
    id_cond:{
        type:Number,
    },
    id_moyen_transpor:{
        type:Number,
    },
    id_user:{
        type:Number,
    },
    pointDepart: {
        type: String,
        required: true
    },
    pointArrivee: {
        type: String,
        required: true
    },
    localisation: {
        type: String,
        required: true
    },
    FireToken: {
      type: String,
      require: false
    },
},
{
    timestamps: true
}
);

conducteurSchema.pre('save', async function (next) {
    if (!this.id_cond) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: 'entityId' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        this.id_cond = counter.seq;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });

  export default model('Conducteur', conducteurSchema);