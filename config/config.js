import mongoose from "mongoose"
import colors from "colors"

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Db connect`.yellow)
  } catch (error) {
    console.log(`Error:${error.message}`.red)
    process.exit(1)
  }
}

export default connectDb
