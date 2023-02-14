import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

