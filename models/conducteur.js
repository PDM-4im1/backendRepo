import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const conducteurSchema = new Schema({
 
    id_moyen_transpor:{
        type:String,
    },
    id_user:{
        type:String,
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
},
{
    timestamps: true
}
);



  export default model('Conducteur', conducteurSchema);