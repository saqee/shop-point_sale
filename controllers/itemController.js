import Items from "../models/items.js"
export const getItemController = async (req, res) => {
  try {
    const items = await Items.find()
    res.status(200).json(items)
  } catch (error) {
    console.log(error.red)
  }
}

export const addItemController = async (req, res) => {
  try {
    const newItem = new Items(req.body)
    console.log(req.body)
    await newItem.save()
    res.status(201).json(newItem)
  } catch (error) {
    console.log(error.red)
  }
}

export const editItemController = async (req, res) => {
  try {
    console.log(req.body)

    await Items.findOneAndUpdate({ _id: req.body.itemId }, req.body)
    res.status(201).send("item update successfully")
  } catch (error) {
    res.status(400).send(error)
  }
}

export const deleteItemController = async (req, res) => {
  await Items.findOneAndDelete({ _id: req.body.itemId })
  res.status(200).send("item delete successfully")
}
