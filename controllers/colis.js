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
            date: req.body.date,
            receiverName: req.body.receiverName,
            receiverPhone: req.body.receiverPhone,
        })
        .then((newColis) => {
            res.status(200).json({
              height: req.newColis.height,
              width: req.newColis.width,
              weight: req.newColis.weight,
              description: req.newColis.description,
              adresse: req.newColis.adresse,
              date: req.newColis.date,
              receiverName: req.newColis.receiverName,
              receiverPhone: req.newColis.receiverPhone,
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
