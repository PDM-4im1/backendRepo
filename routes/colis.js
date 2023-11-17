import express from 'express';
import { getOnce,addOne,deleteOnce } from '../controllers/colis.js';
const router = express.Router();

router
  .route("/")
  .post(addOne);

router
    .route("/:id")
    .get(getOnce)
    .delete(deleteOnce);
export default router;
