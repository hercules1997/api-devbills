import mongoose from "mongoose";

export async function setupMongo(): Promise<void>  {
    try {
        if(mongoose.connection.readyState === 1) {
            return
        }

        console.log("🎲 Connecting to DB ...")
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log("🌐 Connected!")
    } catch (err) {
        throw new Error('❌ DB not connected.!')
    }
}