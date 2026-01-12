import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const products = [
//   { id: 1, productName: "Ürün 1", stock: 10, isActive: true },
//   { id: 2, productName: "Ürün 2", stock: 20, isActive: false },
//   { id: 3, productName: "Ürün 3", stock: 30, isActive: true },
//   { id: 4, productName: "Ürün 4", stock: 40, isActive: false },
//   { id: 5, productName: "Ürün 5", stock: 50, isActive: true },
// ];

function App() {
  return (
    <>
      <ToastContainer position="top-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
