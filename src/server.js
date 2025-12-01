import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import 'dotenv/config';
import ENV from './config/env.js';
import { connectDB } from './config/db.js';
import { functions, inngest } from "./config/inngest.js";

import adminRoutes from './routes/admin.route.js';
import userRoutes from './routes/user.route.js';
import orderRoutes from './routes/order.route.js';
import reviewRoutes from './routes/review.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';

const app = express();
const PORT = ENV.PORT;
app.use(cors({ origin: [ENV.CLIENT_URL, ENV.MOBILE_CLIENT_URL], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get('/', (req, res) => {
    res.send('E-commerce Backend is running');
});

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();