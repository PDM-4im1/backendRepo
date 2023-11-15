import Conducteur from "../models/conducteur.js";
import Covoiturage from "../models/covoiturage.js";



  export async function saveCovoiturage(req, res){
    const { conducteur, client, pointDepart, pointArrivee, Tarif, date } = req.body;

  try {
    // Convert date string to ISODate format
    const isoDate = new Date(date);

    const newCovoiturage = new Covoiturage({
      conducteur,
      client,
      pointDepart,
      pointArrivee,
      date: isoDate,
      Tarif,
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
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  export async function getListeByLocation(req, res) {
    const { localisation } = req.params;
  
    const conducteur = await Conducteur.findOne({ localisation });
  
    if (!conducteur) {
      return res.status(404).json({ message: 'Conducteur not found' });
    }
  
    res.status(200).json(conducteur);
  }
  export async function deleteOnce(req, res) {
    const id = req.params.id;
  
    try {
      const covoiturage = await Covoiturage.findOne({ id_covoiturage: id });
  
      if (!covoiturage) {
        return res.status(404).json({ message: 'Covoiturage not found.' });
      }
  
      await covoiturage.deleteOne();
  
      res.status(200).json({ message: 'Covoiturage successfully deleted.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  export async function show(req,res){
    const { client, pointDepart, pointArrivee } = req.body;
    res.status(200).json('point de depart :', pointDepart, "point d'arrivee :",pointArrivee);
  }