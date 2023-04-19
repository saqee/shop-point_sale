import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import colors from "colors"
import connectDb from "./config/config.js"
import itemRoutes from "./routes/itemRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import billRoutes from "./routes/billRoutes.js"
dotenv.config()
connectDb()
let app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/items", itemRoutes)
app.use("/api/users", userRoutes)
app.use("/api/bills", billRoutes)
app.listen(process.env.PORT || 3001, () => {
  console.log("server running" + process.env.PORT.white)
})
