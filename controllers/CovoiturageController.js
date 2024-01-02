import Conducteur from "../models/conducteur.js";
import Covoiturage from "../models/covoiturage.js";
import userSchema from "../models/user.js";
import MoyenDeTransport from "../models/MoyenDeTransport.js";

  export async function saveCovoiturage(req, res){
    const { id_cond, id_user, pointDepart, pointArrivee, dateCovoirurage, Tarif, statut, typeCov } = req.body;

  try {
    // Convert date string to ISODate format
    const isoDate = new Date(dateCovoirurage);

    const newCovoiturage = new Covoiturage({
      id_cond,
      id_user,
      pointDepart,
      pointArrivee,
      dateCovoirurage: isoDate,
      Tarif,
      statut,
      typeCov,
    });

    await newCovoiturage.save();

    res.status(201).json(
      { _id : newCovoiturage.id,
        id_cond : newCovoiturage.id_cond,
        id_user : newCovoiturage.id_user,
        pointDepart : newCovoiturage.pointDepart,
        pointArrivee : newCovoiturage.pointArrivee,
        dateCovoirurage : newCovoiturage.dateCovoirurage,
        Tarif : newCovoiturage.Tarif,
        statut : newCovoiturage.statut,
        typeCov : newCovoiturage.typeCov}
      );
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  export async function editCovoiturage(req, res) {
    const { id_cond, id_user, pointDepart, pointArrivee, dateCovoirurage, Tarif, statut, typeCov } = req.body;
    const { id } = req.params;
  
    try {
      // Convert date string to ISODate format
      const isoDate = new Date(dateCovoirurage);
  
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
      updatedCovoiturage.dateCovoirurage = isoDate;
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
    if(statut != null){
      updatedCovoiturage.statut = statut
    }
      // Save the updated Covoiturage document
      await updatedCovoiturage.save();
  
      res.status(200).json({
        id: updatedCovoiturage._id,
        conducteur: updatedCovoiturage.id_cond,
        client: updatedCovoiturage.id_user,
        pointDepart: updatedCovoiturage.pointDepart,
        pointArrivee: updatedCovoiturage.pointArrivee,
        dateCovoirurage: updatedCovoiturage.dateCovoirurage,
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
  export async function getLastCovoiturage(req, res) {
    try {
      // Find the last covoiturage entry based on the timestamps
      const lastCov = await Covoiturage.findOne().sort({ createdAt: -1 }).limit(1);
  
      if (!lastCov) {
        return res.status(404).json({ message: 'No covoiturage found' });
      }
  
      res.status(200).json(lastCov);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  export async function findCovoiturageById(req, res) {
    const id = req.params.id;
    try {
        const Covoiturage = await Covoiturage.findOne({_id:id });
        res.status(200).json(Covoiturage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    } 
  }
  export async function SendMailById(req, res) {
    const id = req.params.id;
    const cov = req.params.covoiturage
    try {
        const userSchema = await userSchema.findOne({_id:id });
        const Covoiturage = await Covoiturage.findOne({_id:cov.id });
        mailer.sendEmail(userSchema,Covoiturage)
        res.status(200).json(userSchema);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    } 
  }
  export async function show(req,res){
    const { client, pointDepart, pointArrivee } = req.body;
    res.status(200).json('point de depart :', pointDepart, "point d'arrivee :",pointArrivee);
  }
  export async function getListecovcond(req, res) {
    console.log("req.params")
    const { type, id_cond } = req.params;
  
    // Query condition: typeCov matches the given type, id_cond matches the given id_cond, and statut is not equal to 'active'
    const covoiturage = await Covoiturage.find({
      typeCov: type,
      id_cond: id_cond,
      statut: { $ne: 'active' }  // $ne is a MongoDB operator that means "not equal to"
    });
  
    if (!covoiturage || covoiturage.length === 0) {
      return res.status(404).json({ message: 'covoiturage not found' });
    }
  
    res.status(200).json(covoiturage);
  }