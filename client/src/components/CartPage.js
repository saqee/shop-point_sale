import React, { useState, useEffect } from "react"
import DefaultLayout from "./DefaultLayout.js"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons"
import { Table, Button, Modal, message, Form, Input, Select } from "antd"
const CartPage = () => {
  const [subTotal, setsubTotal] = useState(0)
  const [billpopUp, setbillpopUp] = useState(false)
  const { cartItems } = useSelector((state) => state.rootReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleInc = (count) => {
    dispatch({
      type: "update",
      payload: { ...count, quantity: count.quantity + 1 },
    })
  }

  const handleDec = (count) => {
    dispatch({
      type: "updateDel",
      payload: { ...count, quantity: count.quantity - 1 },
    })
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (i, record) => <img src={i} height="60" width="60" />,
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (i, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleInc(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            onClick={() => handleDec(record)}
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id, record) => (
        <DeleteOutlined
          onClick={() =>
            dispatch({
              type: "delete",
              payload: record,
            })
          }
        />
      ),
    },
  ]
  useEffect(() => {
    let temp = 0
    cartItems.forEach((element) => {
      temp = temp + element.price * element.quantity
      setsubTotal(temp)
    })
  }, [])

  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth")),
      }
      // console.log(newObject);
      await axios.post("/api/bills/add-bills", newObject)
      message.success("Bill Generated")
      navigate("/bills")
    } catch (error) {
      message.error("Something went wrong")
      console.log(error)
    }
  }
  return (
    <DefaultLayout>
      CartPage
      <Table dataSource={cartItems} columns={columns} />
      <div className="d-flex flex-column align-items-end">
        <hr />
        <h3>
          SUBT TOTAL : $ <b> {subTotal}</b> /-{" "}
        </h3>
        <Button type="primary" onClick={() => setbillpopUp(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billpopUp}
        onCancel={() => setbillpopUp(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerNumber" label="Contact Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h5>
              Sub Total : <b>{subTotal}</b>
            </h5>
            <h4>
              TAX
              <b> {((subTotal / 100) * 10).toFixed(2)}</b>
            </h4>
            <h3>
              GRAND TOTAL -{" "}
              <b>
                {Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))}
              </b>
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  )
}

export default CartPage
