import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';
dotenv.config();

app.use(cors());
//localhost:5000/posts

//general middleware setup
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/posts', postRoutes);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

const app = express();

app.set('port', PORT);

app.listen(PORT, () => console.log(`Server is running on port ${port_number}`));
const CONNECTION_URL = process.env.MONGO_URI;

//connect to mongodb db
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`mongo_db connected`))
  .catch((error) => console.log(error.message));
