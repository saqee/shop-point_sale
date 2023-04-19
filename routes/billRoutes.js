import expres from "express"
import {
  addBillController,
  getBillController,
} from "../controllers/billController.js"

const router = expres.Router()

router.post("/add-bills", addBillController)
router.get("/get-bills", getBillController)

export default router
