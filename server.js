import express  from 'express';
const app = express();
const port = 8080;

import {productos} from './contenedor.js';

app.get('/', (req, res)=>{
    res.send('Estas en el home');
})
app.get('/productos', async (req, res)=>{
    const prods = await productos.getAll();
    res.send(prods);
})
app.get('/productoRandom', async (req, res)=>{
    const prods = await productos.getAll();
    const randomNumber = () => {
        return Math.floor(Math.random()*(prods.length)+1);//de esta forma el número aleatorio incluye al valor máximo.
    }
    const productoRandom = prods.find(obj => obj.id === randomNumber());
    res.send(productoRandom);
})

app.listen(port, ()=>{
    console.log("Tu servidor esta corriendo en el puerto " + port);
})
app.on("error", error=> console.log("El error es: " + error))