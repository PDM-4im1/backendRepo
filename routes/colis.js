import express from 'express';
import { getColis,addOne,deleteOnce,updateOne, findAll,assignerLivreur,changeEtatColis , getColisByLivreur,findUnassignedColis} from '../controllers/colis.js';
const router = express.Router();

router
  .route("/")
  .post(addOne);
router
  .route("/get")
  .get(findAll);
router
  .route("/getunassigned")
  .get(findUnassignedColis);
router
  .route("/getColisByLivreur")
  .post(getColisByLivreur);  
router
  .route("/changeEtatColis")
  .post(changeEtatColis);  
router
  .route("/getColis")
  .post(getColis);
router
    .route("/:id")
    .delete(deleteOnce)
    .put(updateOne);
router
    .route("/assign")
    .post(assignerLivreur);

export default router;