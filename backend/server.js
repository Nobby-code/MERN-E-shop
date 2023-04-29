import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import products from './data/products.js'
import bodyParser from 'body-parser';

dotenv.config()
const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    if (product){
        res.json(product);
    } else {
        res.sendStatus(404);
    }
})

const PORT = process.env.PORT || 5000;


app.listen(5000, () => {
    console.log(`Server running in ${process.env.NODE_ENV } mode on port ${PORT}`)
})