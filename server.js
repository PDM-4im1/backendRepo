import express from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blog.js';

const databaseName = 'shareCommute'
const app = express();
const port = process.env.PORT || 9090;
mongoose
    .connect(`mongodb+srv://shareCommute:sharecommute123@cluster0.tnifzps.mongodb.net/${databaseName}`)
    .then(() => {
        console.log(`connected to ${databaseName}`) 
       })
       .catch(err => {
        console.log(err);
      });
app.use(express.json());
app.use('/blog',blogRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
