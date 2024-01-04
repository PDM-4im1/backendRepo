import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const covoiturageSchema = new Schema({
  
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
    }
},
{
    timestamps: true
}
);



  export default model('Covoiturage', covoiturageSchema);