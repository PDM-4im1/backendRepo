import MoyenDeTransport from "../models/MoyenDeTransport.js";
import userSchema from "../models/user.js";
import conducteurSchema from "../models/conducteur.js";
import covoiturageSchema from "../models/covoiturage.js";
export async function saveMoyenDeTransport(req, res){
  
    const { marque, type, matricule, image, trajet, idConducteur } = req.body;
    console.log("Received Request Body:", req.body);
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
  export async function editMoyenDeTransport(req, res) {
    const { id } = req.params; // Assuming you are passing the ID as a parameter
    const { marque, type, matricule, image, trajet, idConducteur } = req.body;
  
    try {
      // Check if the MoyenDeTransport with the given ID exists
      const existingMoyenDeTransport = await MoyenDeTransport.findById(id);
  
      if (!existingMoyenDeTransport) {
        return res.status(404).json({ error: 'MoyenDeTransport not found' });
      }
  
      // Update the properties of the existing MoyenDeTransport
      existingMoyenDeTransport.marque = marque;
      existingMoyenDeTransport.type = type;
      existingMoyenDeTransport.matricule = matricule;
      existingMoyenDeTransport.image = image;
      existingMoyenDeTransport.trajet = trajet;
      existingMoyenDeTransport.idConducteur = idConducteur;
  
      // Save the updated MoyenDeTransport
      await existingMoyenDeTransport.save();
  
      res.status(200).json({
        marque: existingMoyenDeTransport.marque,
        type: existingMoyenDeTransport.type,
        matricule: existingMoyenDeTransport.matricule,
        image: existingMoyenDeTransport.image,
        trajet: existingMoyenDeTransport.trajet,
        idConducteur: existingMoyenDeTransport.idConducteur,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  export async function deleteMoyenDeTransport(req, res) {
    const { id } = req.params;
  
    try {
      // Find the MoyenDeTransport with the given ID and delete it
      const result = await MoyenDeTransport.deleteOne({ _id: id });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'MoyenDeTransport not found' });
      }
  
      res.status(200).json({
        message: 'MoyenDeTransport deleted successfully',
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  export async function saveconducteur(req, res){
    const { id_moyen_transpor, id_user, pointDepart, pointArrivee, localisation } = req.body;

  try {

    const conducteur = new conducteurSchema({
      id_moyen_transpor,
      id_user,
      pointDepart,
      pointArrivee,
      localisation,
    });

    await conducteur.save();

    res.status(201).json({
    
      id_moyen_transpor: conducteur.id_moyen_transpor,
      id_user: conducteur.id_user,
      pointDepart: conducteur.pointDepart,
      pointArrivee: conducteur.pointArrivee,
      localisation: conducteur.localisation,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
export async function findAllMoyenDeTransport(req, res) {
  try {
      const moyensDeTransport = await MoyenDeTransport.find();
      res.status(200).json(moyensDeTransport);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  } 
}
 
export async function findAllCovoiturages(req, res) {
  try {
      const covoiturage = await covoiturageSchema.find();
      res.status(200).json(covoiturage);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function findAllDrivers(req, res) {
  try {
    const driverUsers = await userSchema.find({ role:'driver' });
    res.status(200).json(driverUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


