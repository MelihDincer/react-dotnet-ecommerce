import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { Box, CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import requests from "../api/requests";
import { useCartContext } from "../context/CartContext";

function App() {
  const { setCart } = useCartContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requests.Cart.get()
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress size={40} />
      </Box>
    );
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
