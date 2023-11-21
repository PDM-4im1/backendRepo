import mongoose from "mongoose";
import Counter from './counter.js';

const { Schema, model } = mongoose;

const MoyenDeTransport = new Schema({
    id_moyen_transport: {
        type: Number,
        required: false
    },
    marque: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    matricule: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    trajet: {
        type: String,
        required: false
    },
    idConducteur: {
        type: Number,
        required: false
    },
});
MoyenDeTransport.pre('save', async function (next) {
    if (!this.id_moyen_transport) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: 'entityId' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        this.id_moyen_transport = counter.seq;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });

export default model('moyen_de_transport', MoyenDeTransport);
