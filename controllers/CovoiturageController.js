import Conducteur from "../models/conducteur.js";
import Covoiturage from "../models/covoiturage.js";
import userSchema from "../models/user.js";
import MoyenDeTransport from "../models/MoyenDeTransport.js";

export async function findAllCovoituragesClient(req,res) {
  try {
      const { id_user } = req.params; // Assuming id_user is in the request parameters
      const covoiturage = await Covoiturage.find();
      
      if (!covoiturage || covoiturage.length === 0) {
          return res.status(404).json({ message: "Covoiturage not found" });
      }

      res.status(200).json(covoiturage);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}
  export async function saveCovoiturage(req, res){
    const { id_cond, id_user, pointDepart, pointArrivee, dateCovoiturage, Tarif, statut, typeCov } = req.body;
    console.log("newCovoiturage")
  try {
    // Convert date string to ISODate format

    const newCovoiturage = new Covoiturage({
      id_cond,
      id_user,
      pointDepart,
      pointArrivee,
      dateCovoiturage,
      Tarif,
      statut,
      typeCov,
    });
    

    await newCovoiturage.save();

    res.status(201).json({
        conducteur: newCovoiturage.id_cond,
        client: newCovoiturage.id_user,
        pointDepart: newCovoiturage.pointDepart,
        pointArrivee: newCovoiturage.pointArrivee,
        dateCovoiturage: newCovoiturage.dateCovoiturage,
        Tarif: newCovoiturage.Tarif,
        statut: newCovoiturage.statut,
        typeCov: newCovoiturage.typeCov,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  export async function editCovoiturage(req, res) {
    const { id_cond, id_user, pointDepart, pointArrivee, dateCovoiturage, Tarif, statut, typeCov } = req.body;
    const { id } = req.params;
  
    try {
      // Convert date string to ISODate format
      const isoDate = new Date(date);
  
      const updatedCovoiturage = await Covoiturage.findById(id);
  
      if (!updatedCovoiturage) {
        return res.status(404).json({ error: 'Covoiturage not found' });
      }
  
      // Update the properties of the Covoiturage document
     if(id_cond != null){
      updatedCovoiturage.id_cond = id_cond;
     }
      if(id_user != null){
      updatedCovoiturage.id_user = id_user;
      }
      if(pointDepart != null){
      updatedCovoiturage.pointDepart = pointDepart;
      }
      if(pointArrivee != null){
      updatedCovoiturage.pointArrivee = pointArrivee;
      }
      if(isoDate != null){
      updatedCovoiturage.dateCovoiturage = dateCovoiturage;
      }
      if(Tarif != null){
      updatedCovoiturage.Tarif = Tarif;
      }
      if(id_cond != null){
      updatedCovoiturage.statut = statut;
    }
    if(typeCov != null){
      updatedCovoiturage.typeCov = typeCov;
    }
      // Save the updated Covoiturage document
      await updatedCovoiturage.save();
  
      res.status(200).json({
        id: updatedCovoiturage._id,
        conducteur: updatedCovoiturage.id_cond,
        client: updatedCovoiturage.id_user,
        pointDepart: updatedCovoiturage.pointDepart,
        pointArrivee: updatedCovoiturage.pointArrivee,
        dateCovoiturage: updatedCovoiturage.dateCovoiturage,
        Tarif: updatedCovoiturage.Tarif,
        statut: updatedCovoiturage.statut,
        typeCov: updatedCovoiturage.typeCov,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }


export async function getListeByLocation(req, res) {
    const { localisation } = req.params;
//console.log('Received localisation:', localisation);
  
    try {
        const conducteurs = await Conducteur.find({ localisation });
   console.log('Found conducteurs:', conducteurs);
       if (conducteurs.length === 0) {
            return res.status(404).json({ message: 'No conducteurs found for the given localisation' });
        }  res.status(200).json(conducteurs);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
      }
  }
     

  

  export async function deleteOnce(req, res) {
    const id = req.params.id;
  
    try {
      const covoiturage = await Covoiturage.deleteOne({ _id:id });
  
      if (covoiturage.deletedCount === 0) {
        return res.status(404).json({ error: 'Covoiturage not found' });
      } 
  
  
      res.status(200).json({ message: 'Covoiturage successfully deleted.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  export async function getListeByType(req, res) {
    const { type } = req.params;
  
    const covoiturage = await Covoiturage.find({ typeCov:type });
  
    if (!covoiturage) {
      return res.status(404).json({ message: 'covoiturage not found' });
    }
  
    res.status(200).json(covoiturage);
  }

  export async function findUserById(req, res) {
    const id = req.params.id;
    try {
      const driverUser = await userSchema.findOne({ _id:id });
      res.status(200).json(driverUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  export async function findConducteurById(req, res) {
    const id = req.params.id;
    try {
      const conducteur = await Conducteur.findOne({ _id: id });
      if (conducteur) {
        res.status(200).json(conducteur);
      } else {
        res.status(404).json({ error: 'Conducteur not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  export async function getDetails(req, res) {
    const id = req.params.id;
  
    const covoiturage = await Covoiturage.findOne({ _id:id });
  
    if (!covoiturage) {
      return res.status(404).json({ message: 'covoiturage not found' });
    }
  
    res.status(200).json(covoiturage);
  }
  export async function findMoyenDeTransportById(req, res) {
    const id = req.params.id;
    try {
        const moyenDeTransport = await MoyenDeTransport.findOne({_id:id });
        res.status(200).json(moyenDeTransport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    } 
  }
  export async function show(req,res){
    const { client, pointDepart, pointArrivee } = req.body;
    res.status(200).json('point de depart :', pointDepart, "point d'arrivee :",pointArrivee);
  }