import mongoose from "mongoose"
import Items from "./models/items.js"
import items from "./utils/data.js"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/config.js"

connectDb()
const seedProducts = async () => {
  try {
    /* await Items.deleteMany()
    console.log("Products are deleted") */

    await Items.insertMany(items)
    console.log("All Products are added.")

    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

seedProducts()
