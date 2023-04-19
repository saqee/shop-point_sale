import React, { useEffect } from "react"
import { Form, Input, Button } from "antd"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { message } from "antd"
import axios from "axios"
import { useDispatch } from "react-redux"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (value) => {
    try {
      const res = await axios.post("/api/users/login", value)

      message.success("user login Succesfully")
      localStorage.setItem("auth", JSON.stringify(res.data))
      navigate("/")
    } catch (error) {
      message.error("Something Went Wrong")
      console.log(error)
    }
  }
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      return <Navigate to="/" />
    }
  }, [])
  return (
    <>
      <div className="register">
        <div className="regsiter-form">
          <h1>POS APP</h1>
          <h3>Login Page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <p>
                not a user Please
                <Link to="/register"> Register Here !</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login
