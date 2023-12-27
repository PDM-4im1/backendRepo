import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const covoiturageSchema = new Schema({
   
    id_cond:{
        type:String,
    },
    id_user:{
        type:String,
    },
    pointDepart: {
        type: String,
        required: false 
    },
    pointArrivee: {
        type: String,
        required: false
    },
    dateCovoiturage:{
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


  export default model('Covoiturage', covoiturageSchema);