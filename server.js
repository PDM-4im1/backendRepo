import express from 'express'; 
import mongoose from 'mongoose';
import myMiddleware from './middlewares/middleware.js';
import morgan from 'morgan';
import CovoiturageRoutes from './routes/CovoiturageRoutes.js';
import MoyenDeTransportRoutes from './routes/MoyenDeTransportRoutes.js';
import colisRoutes from './routes/colis.js';
import userRoutes from './routes/user.js';
import blogRoutes from './routes/blog.js';
import Covoiturage from './models/covoiturage.js';


const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'shareCommute'

mongoose
    .connect(`mongodb+srv://shareCommute:sharecommute123@cluster0.tnifzps.mongodb.net/${databaseName}`,)
    .then(() => {
        console.log(`connected to ${databaseName}`) 
       })
       .catch(err => {
        console.log(err);
      });




app.use(myMiddleware);

app.use(express.json());
app.use(morgan('dev'));

app.use('/user',userRoutes);
app.use('/covoiturage',CovoiturageRoutes);
app.use('/moyenDeTransport',MoyenDeTransportRoutes);
app.use('/colis', colisRoutes);
app.use('/blog',blogRoutes);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });