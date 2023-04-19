import React from "react"
import { Card, Button } from "antd"
import { Skeleton, Switch } from "antd"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import { useDispatch } from "react-redux"
const { Meta } = Card
export const ItemList = ({ item }) => {
  let dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch({
      type: "updateCart",
      payload: { ...item, quantity: 1 },
    })
  }
  return (
    <Card
      hoverable
      style={{
        width: 240,
        marginBottom: 20,
      }}
      cover={<img alt="example" src={item?.image} style={{ height: 220 }} />}
    >
      <Meta title={item.name} />
      <div className="item-button">
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </Card>
  )
}
