import React, { useEffect, useState } from "react"
import DefaultLayout from "../components/DefaultLayout"
import axios from "axios"
import { Modal, Button, Table, Form, Input, Select, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons"
const ItemPage = () => {
  const [itemData, setItemData] = useState([])
  const [popupModel, setpopupModel] = useState(false)
  const [editItem, seteditItem] = useState(false)
  const dispatch = useDispatch()
  const handleCancel = () => {
    seteditItem(null)
    setpopupModel(false)
  }
  const getAllItems = async () => {
    try {
      const { data } = await axios.get("/api/items/get-item")
      setItemData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllItems()
  }, [])
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
      title: "Action",
      dataIndex: "_id",
      render: (_id, record) => (
        <div style={{ cursor: "pointer" }}>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log(_id)
              handleDelete(record)
            }}
          />
          <EditOutlined
            onClick={() => {
              seteditItem(record)
              setpopupModel(true)
            }}
          />
        </div>
      ),
    },
  ]
  const handleDelete = async (record) => {
    await axios.post("/api/items/delete-item", { itemId: record._id })
    getAllItems()
  }
  const handleSubmit = async (value) => {
    if (editItem == null) {
      try {
        let res = await axios.post("/api/items/add-item", value)
        message.success("item added successfully")
        getAllItems()
        setpopupModel(false)
        dispatch({
          type: "additem",
        })
        value = false
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        let res = await axios.put("/api/items/edit-item", {
          ...value,
          itemId: editItem._id,
        })
        message.success("update successfully")
        getAllItems()
        setpopupModel(false)
        dispatch({
          type: "edititem",
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between ">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setpopupModel(true)}>
          Add Item
        </Button>
      </div>
      <Table dataSource={itemData} columns={columns} />;
      {popupModel && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add item "}`}
          open={popupModel}
          footer={false}
          onCancel={() => {
            seteditItem(null)
            setpopupModel(false)
          }}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodels</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  )
}

export default ItemPage
