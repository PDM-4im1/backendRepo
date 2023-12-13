import mongoose from 'mongoose';
import Counter from './counter.js';

const { Schema, model } = mongoose;

const covoiturageSchema = new Schema({
    id_covoiturage:{
        type:Number,
    },
    id_cond:{
        type:Number,
    },
    id_user:{
        type:Number,
    },
    pointDepart: {
        type: String,
        required: false 
    },
    pointArrivee: {
        type: String,
        required: false
    },
    Date:{
        type: String,
        required: false
    },
    Tarif:{
        type: Number,
        required: false
    },
    statut:{
        type: String,
        required : false
    },
    typeCov:{
        type: String,
        required : false
    }
},
{
    timestamps: true
}
);

covoiturageSchema.pre('save', async function (next) {
    if (!this.id_covoiturage) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: 'entityId' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        this.id_covoiturage = counter.seq;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });

  export default model('Covoiturage', covoiturageSchema);