import Bills from "../models/bills.js"
export const addBillController = async (req, res) => {
  try {
    const bills = new Bills(req.body)
    await bills.save()
    res.status(200).json("bill added")
  } catch (error) {
    console.log(error.red)
  }
}

export const getBillController = async (req, res) => {
  let bill = await Bills.find()
  res.send(bill)
}
