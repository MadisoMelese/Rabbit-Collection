import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import  connectDB from "./config/db.js";
import productroutes from './routes/productRoutes.js';
import authroutes from './routes/userRoutes.js';
import cart from './routes/cartRoutes.js';
import  Checkout  from './routes/checkoutRoutes.js';
import  orderRoutes  from './routes/orderRoutes.js';
import  uploadRoutes  from './routes/uploadRoutes.js';
import  subscribeRoute  from './routes/subscribeRoutes.js';
import  adminRoutes  from './routes/adminRoutes.js';
import  adminProductRoutes  from './routes/adminProductRoutes.js';
import  adminOrderRoutes  from './routes/adminOrderRoutes.js';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authroutes);
app.use('/api/products', productroutes);
app.use('/api/cart', cart);
app.use('/api/checkout', Checkout);
app.use('/api/orderRoutes', orderRoutes);
app.use('/api/uploadRoutes', uploadRoutes);
app.use('/api/subscriber', subscribeRoute);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/admin/orders', adminOrderRoutes);


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  connectDB()
  console.log(`Server is running on http://localhost:${PORT}`)

})