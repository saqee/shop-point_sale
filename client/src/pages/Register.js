import React, { useEffect } from "react"
import { Form, Input, Button } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { message } from "antd"
import axios from "axios"
import { useDispatch } from "react-redux"
const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (value) => {
    try {
      const res = await axios.post("/api/users/register", value)

      message.success("user register Succesfully")
      /* localStorage.setItem("auth", JSON.stringify(res.data)) */
      navigate("/login")
    } catch (error) {
      message.error("Something Went Wrong")
      console.log(error)
    }
  }
  return (
    <>
      <div className="register">
        <div className="regsiter-form">
          <h1>POS APP</h1>
          <h3>Register Page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <p>
                ALready Register Please
                <Link to="/login"> Login Here !</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Register
