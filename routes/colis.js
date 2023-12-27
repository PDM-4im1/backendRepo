import express from 'express';
import { getOnce,addOne,deleteOnce, findAll } from '../controllers/colis.js';
const router = express.Router();

router
  .route("/")
  .post(addOne)
  .get(findAll);

router
    .route("/:id")
    .get(getOnce)
    .delete(deleteOnce);
export default router;
