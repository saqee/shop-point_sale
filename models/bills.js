import mongoose from "mongoose"

const billSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerNumber: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
  },
  { timestamp: true }
)

const Bills = mongoose.model("bills", billSchema)

export default Bills
