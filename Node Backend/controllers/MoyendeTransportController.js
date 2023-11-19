import Conducteur from "../models/conducteur.js";
import MoyenDeTransport from "../models/MoyenDeTransport.js";

export async function saveMoyenDeTransport(req, res){
    const { marque, type, matricule, image, trajet, idConducteur } = req.body;

  try {

    const NewMoyenDeTransport = new MoyenDeTransport({
        marque,
        type,
        matricule,
        image,
        trajet,
        idConducteur,
    });

    await NewMoyenDeTransport.save();

    res.status(201).json({
    
        marque: NewMoyenDeTransport.marque,
        type: NewMoyenDeTransport.type,
        matricule: NewMoyenDeTransport.matricule,
        image: NewMoyenDeTransport.image,
        trajet: NewMoyenDeTransport.trajet,
        idConducteur: NewMoyenDeTransport.idConducteur,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }