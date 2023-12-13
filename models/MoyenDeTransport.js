import mongoose from "mongoose";
import Counter from './counter.js';

const { Schema, model } = mongoose;

const MoyenDeTransport = new Schema({
   
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
        type: String,
        required: false
    },
});


export default model('moyen_de_transport', MoyenDeTransport);
