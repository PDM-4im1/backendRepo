import { validationResult } from "express-validator";
import Colis from "../models/colis.js";


export const addOne = async (req, res) =>{
  console.log("aaaa")
    if (!validationResult(req).isEmpty()) {
        res.status(400).json({ errors: validationResult(req).array() });
      } 
      else {
        console.log("bbbb")
        const colisId = await generateUniqueColisId();
        Colis.create({
          id: colisId,
            height: req.body.height,
            width: req.body.width,
            weight: req.body.weight,
            description: req.body.description,
            adresse: req.body.adresse,
            destination: req.body.destination,
            receiverName: req.body.receiverName,
            receiverPhone: req.body.receiverPhone,
            etat: "non Livree",
            idLivreur: "",
            idClient:req.body.idClient,
        })
       // console.log("ffff")
        .then((newColis) => {
            res.status(200).json({
              id: colisId,
              height: newColis.height,
              width: newColis.width,
              weight: newColis.weight,
              description: newColis.description,
              adresse: newColis.adresse,
              destination: newColis.destination,
              receiverName: newColis.receiverName,
              receiverPhone: newColis.receiverPhone,
              etat: "non Livree",
             idLivreur: "",
             idClient:newColis.idClient,
            });
          })
          .catch((err) => {
            console.log("Error creating Colis:", err);
            res.status(500).json({ error: err });
          });
        
      }
}
async function generateUniqueColisId() {
  while (true) {
      const uniqueColisId = Math.floor(1000 + Math.random() * 9000); 
      const colisExists = await Colis.findOne({ colisId: uniqueColisId });
      if (!colisExists) {
          return uniqueColisId;
      }
  }
}

export async function getColis(req, res) {
  try {
    const id = req.body.id;

    // Find the Colis by its ID
    const colis = await Colis.findOne({ id });

    if (!colis) {
      return res.status(404).json({ message: 'Colis not found.' });
    }

    res.status(200).json(colis);
  } catch (error) {
    console.error('Error occurred during getColis:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const deleteOnce = async  (req, res) =>{
  try {
    const colis = await Colis.findOne({ id: req.params.id });

    if (!colis) {
      return res.status(404).json({ message: 'Colis not found.' });
    }

    await colis.deleteOne();
    return res.status(200).json({ message: 'Colis successfully deleted.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
  
  export async function findAll(req, res) {
    console.log("llllll")
    try {
        const colis = await Colis.find();
        res.status(200).json(colis);
    } catch (error) {
        console.error('Error occurred during findAll:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
  }
  export async function assignerLivreur(req, res) {
    console.log("hhhhhhh")
    try {
      const { id, idLivreur } = req.body;
  
      // Find the Colis by its ID
      const colis = await Colis.findOne({ id });
  
      if (!colis) {
        return res.status(404).json({ message: 'Colis not found.' });
      }
  
      // Update idLivreur and etat fields
      colis.idLivreur = idLivreur;
      colis.etat = 'en route';
  
      // Save the updated Colis
      await colis.save();
  
      res.status(200).json({ message: 'Colis updated successfully.' });
    } catch (error) {
      console.error('Error occurred during assignerLivreur:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  export async function findUnassignedColis(req, res) {
    try {
      const unassignedColis = await Colis.find({
        idLivreur: '',
        etat: 'non Livree'
      });
      console.log("aazeazeazezeazea",unassignedColis)
      res.status(200).json(unassignedColis);
    } catch (error) {
      console.error('Error occurred during findUnassignedColis:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  export async function getColisByLivreur(req, res) {
    console.log("kkkk")
    try {
      
      const idLivreur = req.body.idLivreur
      console.log("idLivreur;", idLivreur)
      console.log("Request body:", req.body);
      const colisByLivreur = await Colis.find({ idLivreur: idLivreur });
      console.log("yoyoyoyo", colisByLivreur)
      res.status(200).json(colisByLivreur);
    } catch (error) {

      console.error('Error occurred during getColisByLivreur:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
    
  }
  export async function changeEtatColis(req, res) {
    console.log("kkkkoooooo")
    try {
        const { id, etat } = req.body;
        console.log("idLi;", id)
        // Find the Colis by its ID
        const colis = await Colis.findOne({ id });

        if (!colis) {
            return res.status(404).json({ message: 'Colis not found.' });
        }

        // Update the etat field
        colis.etat = etat;

        // Save the updated Colis
        await colis.save();

        res.status(200).json({ message: 'Colis etat updated successfully.' });
    } catch (error) {
        console.error('Error occurred during changeEtatColis:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export async function updateOne(req, res) {
  try {
    const { id } = req.params; // Extract the receiverPhone from params
    const updatedColis = await Colis.findOneAndUpdate(
      { id }, // Find by receiverPhone
      req.body, // Update with the request body
      { new: true }
    );

    if (!updatedColis) {
      return res.status(404).json({ message: 'Colis not found.' });
    }

    res.status(200).json(updatedColis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
 }