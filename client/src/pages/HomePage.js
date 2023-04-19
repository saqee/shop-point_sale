import React, { useEffect, useState } from "react"
import DefaultLayout from "../components/DefaultLayout"
import axios from "axios"
import { Row, Col } from "antd"
import { ItemList } from "../components/Item"
const HomePage = ({ children }) => {
  const [itemData, setItemData] = useState([])
  const [selectedCat, setselectedCat] = useState("drinks")
  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await axios.get("/api/items/get-item")
        setItemData(data)
      } catch (error) {
        console.log(error)
      }
    }

    getAllItems()
  }, [])

  const [selecedCategory, setSelecedCategory] = useState("drinks")
  const categories = [
    {
      name: "drinks",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png",
    },
    {
      name: "rice",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3174/3174880.png",
    },
    {
      name: "noodles",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1471/1471262.png",
    },
  ]
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selecedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelecedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="40"
              width="60"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemData
          .filter((i) => i.category == selecedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  )
}

export default HomePage
