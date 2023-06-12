import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import products from './data/products.js'
import bodyParser from 'body-parser';
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoute.js'


dotenv.config()
connectDB()
const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running');
});

//mounting productRoutes 
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


app.use(notFound)

//error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000;


app.listen(5000, () => {
    console.log(`Server running in ${process.env.NODE_ENV } mode on port ${PORT}`)
})