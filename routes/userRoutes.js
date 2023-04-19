import expres from "express"
import {
  loginController,
  registerController,
} from "../controllers/userController.js"

const router = expres.Router()

router.post("/login", loginController)
router.post("/register", registerController)

export default router
