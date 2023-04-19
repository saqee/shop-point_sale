import { trusted } from "mongoose"
import User from "../models/user.js"
export const loginController = async (req, res) => {
  const { userId, password } = req.body
  const user = await User.findOne({ userId, password, verified: true })
  res.status(201).json(user)
}

export const registerController = async (req, res) => {
  try {
    const user = new User({ ...req.body, verified: true })
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    console.log(error.red)
  }
}
