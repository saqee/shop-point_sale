import "antd/dist/reset.css"
import HomePage from "./pages/HomePage"
import ItemPage from "./pages/ItemPage"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import CartPage from "./components/CartPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import BillsPage from "./pages/BillsPage"
import CustomerPage from "./pages/CustomerPage"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <protectedRoute>
                <HomePage />{" "}
              </protectedRoute>
            }
          />

          <Route path="/items" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/customer" element={<CustomerPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

export function protectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}
