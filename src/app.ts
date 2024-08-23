import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/user', router);

export default app;
