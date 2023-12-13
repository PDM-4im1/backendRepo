import Conducteur from "../models/conducteur.js";
import Covoiturage from "../models/covoiturage.js";
import userSchema from "../models/user.js";
import MoyenDeTransport from "../models/MoyenDeTransport.js";


  export async function saveCovoiturage(req, res){
    const { id_cond, id_user, pointDepart, pointArrivee, date, Tarif, statut, typeCov } = req.body;

  try {
    // Convert date string to ISODate format
    const isoDate = new Date(date);

    const newCovoiturage = new Covoiturage({
      id_cond,
      id_user,
      pointDepart,
      pointArrivee,
      date: isoDate,
      Tarif,
      statut,
      typeCov,
    });

    await newCovoiturage.save();

    res.status(201).json({
        id: newCovoiturage.id_covoiturage,
        conducteur: newCovoiturage.id_cond,
        client: newCovoiturage.id_user,
        pointDepart: newCovoiturage.pointDepart,
        pointArrivee: newCovoiturage.pointArrivee,
        date: newCovoiturage.Date,
        Tarif: newCovoiturage.Tarif,
        statut: newCovoiturage.statut,
        typeCov: newCovoiturage.typeCov,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  export async function editCovoiturage(req, res) {
    const { _id, id_cond, id_user, pointDepart, pointArrivee, date, Tarif, statut, typeCov } = req.body;
  
    try {
      // Convert date string to ISODate format
      const isoDate = new Date(date);
  
      const updatedCovoiturage = await Covoiturage.findOneAndUpdate(
        { _id },
        {
          id_cond,
          id_user,
          pointDepart,
          pointArrivee,
          date: isoDate,
          Tarif,
          statut,
          typeCov
        },
        { new: true }
      );
  
      if (!updatedCovoiturage) {
        return res.status(404).json({ error: 'Covoiturage not found' });
      }
  
      res.status(200).json({
        id: updatedCovoiturage._id,
        conducteur: updatedCovoiturage.id_cond,
        client: updatedCovoiturage.id_user,
        pointDepart: updatedCovoiturage.pointDepart,
        pointArrivee: updatedCovoiturage.pointArrivee,
        date: updatedCovoiturage.Date,
        Tarif: updatedCovoiturage.Tarif,
        statut : updatedCovoiturage.statut,
        typeCov : updatedCovoiturage.typeCov,
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