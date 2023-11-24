import { validationResult } from "express-validator";
import Colis from "../models/colis.js";


export function addOne(req, res){
    if (!validationResult(req).isEmpty()) {
        res.status(400).json({ errors: validationResult(req).array() });
      } 
      else {
        Colis.create({
            height: req.body.height,
            width: req.body.width,
            weight: req.body.weight,
            description: req.body.description,
            adresse: req.body.adresse,
            destination: req.body.destination,
            receiverName: req.body.receiverName,
            receiverPhone: req.body.receiverPhone,
        })
        .then((newColis) => {
            res.status(200).json({
              height: newColis.height,
              width: newColis.width,
              weight: newColis.weight,
              description: newColis.description,
              adresse: newColis.adresse,
              destination: newColis.destination,
              receiverName: newColis.receiverName,
              receiverPhone: newColis.receiverPhone,
            });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
        
      }
}
export function getOnce(req, res) {
    Colis.findById(req.params.id)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function deleteOnce(req, res) {
    const colis = Colis.findById(req.params.id)
    if (!colis) {
        return res.status(404).json({ message: 'Colis not found.' });
      }
     colis.deleteOne();
     res.status(200).json({ message: 'Colis successfully deleted.' });
  }
  
  export async function findAll(req, res) {
    try {
        const colis = await Colis.find();
        res.status(200).json(colis);
    } catch (error) {
        console.error('Error occurred during findAll:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
  }
