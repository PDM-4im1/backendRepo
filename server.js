import express from 'express'; 
import mongoose from 'mongoose';
import myMiddleware from './middlewares/middleware.js';

import userRoutes from './routes/user.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'shareCommute'

mongoose
    .connect(`mongodb://localhost:27017/${databaseName}`)
    .then(() => {
        console.log(`connected to ${databaseName}`) 
       })
       .catch(err => {
        console.log(err);
      });




app.use(myMiddleware);

app.use(express.json());

app.use('/user',userRoutes);



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });