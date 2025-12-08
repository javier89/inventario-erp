import express from 'express';
import dotenv from 'dotenv';

dotenv.config({
    silent: true
});
const app = express();
app.use(express.json());

// ➤ Rutas
app.get('/', (req, res)=>{
    res.send('Api funcionando');
});

export default app;