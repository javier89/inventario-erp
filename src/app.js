import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import productRoutes from './modules/products/products.route';


dotenv.config({
    silent: true
});

const app = express();

app.use(cors());
app.use(express.json());

// ➤ Rutas
//app.get('/api/product', productRoutes);


app.get('/', (req, res)=>{
    res.send('Api inventario funcionando');
});

export default app;