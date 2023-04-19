import React, { useEffect, useState } from "react"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons"
import { Layout, Menu, theme } from "antd"
import "../styles/defaultstyle.css"
import { Link, Navigate, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
const { Header, Sider, Content } = Layout

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.rootReducer)
  let dispatch = useDispatch()
  console.log(cartItems.length)
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1 className="text-center text-light mt-4 font-wight-bold">POS</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location}>
          <Menu.Item icon={<HomeOutlined />} key="/">
            <Link to={"/"}>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<CopyOutlined />} key="/bills">
            <Link to={"/bills"}>Bills</Link>
          </Menu.Item>
          <Menu.Item icon={<UnorderedListOutlined />} key="/items">
            <Link to={"/items"}>Items</Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />} key="/customers">
            <Link to={"/customers"}>Customers</Link>
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />} key="/logout">
            <Link to={"/logout"}>Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div
            className="cart-item cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
