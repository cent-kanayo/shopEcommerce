import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/mongoDB.js';
import ImportData from './Dataimport.js';
import ProductRoute from './Routes/ProductRoutes.js';
import { errorHandler, notFound } from './Middleware/Error.js';
import UserRouter from './Routes/UserRoutes.js';
import OrderRouter from "./Routes/OrderRoutes.js";
import cors from "cors"



dotenv.config();
connectDatabase();


const app = express();
app.use(express.json());
app.use(cors())
//API

app.use("/api/import", ImportData);
app.use("/api/products", ProductRoute);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);


//Error Handler
app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 1000;

app.listen(5000, console.log(`server running on ${PORT}`));