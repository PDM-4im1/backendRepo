import express from 'express'; 
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import myMiddleware from './middlewares/middleware.js';
import CovoiturageRoutes from './routes/CovoiturageRoutes.js';
import MoyenDeTransportRoutes from './routes/MoyenDeTransportRoutes.js';
import user from './routes/user.js';


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
app.use(cors());

app.use('/covoiturage',CovoiturageRoutes);
app.use('/moyenDeTransport',MoyenDeTransportRoutes);
app.use('/',user);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });