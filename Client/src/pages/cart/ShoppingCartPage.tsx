import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import requests from "../../api/requests";
import { toast } from "react-toastify";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";

export default function ShoppingCartPage() {
  const { cart, setCart, deleteItem } = useCartContext();
  const [status, setStatus] = useState({ loading: false, id: "" });

  function handleAddItem(productId: number, id: string) {
    setStatus({ loading: true, id: id });
    requests.Cart.addItem(productId)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }
  function handleDeleteItem(productId: number, id: string, quantity: 1) {
    setStatus({ loading: true, id: id });
    requests.Cart.deleteItem(productId, quantity)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }
  if (cart?.cartItems.length === 0)
    return <Alert severity="warning">Sepetinizde ürün yok!</Alert>;

  return (
    <Box display="flex" gap={3} alignItems="flex-start">
      <Box flex={4}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3, overflow: "hidden" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f6f7f9" }}>
                <TableCell sx={{ width: 90 }}></TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Ürün</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Fiyat
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Adet
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Toplam
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cart?.cartItems.map((item) => (
                <TableRow
                  key={item.productId}
                  hover
                  sx={{
                    "& td": { paddingY: 2 },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>
                    <img
                      src={`http://localhost:5047/images/${item.imageUrl}`}
                      style={{
                        height: 80,
                        width: 80,
                        objectFit: "contain",
                        borderRadius: 8,
                        backgroundColor: "#fff",
                        boxShadow: "0 0 3px rgba(0,0,0,0.1)",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{item.name}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    {currencyTRY.format(item.price)}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: "30px",
                        padding: "4px 10px",
                        backgroundColor: "#fafafa",
                        width: "fit-content",
                        margin: "auto",
                      }}
                    >
                      <LoadingButton
                        loading={
                          status.loading && status.id === "del" + item.productId
                        }
                        onClick={() =>
                          handleDeleteItem(
                            item.productId,
                            "del" + item.productId,
                          )
                        }
                        size="small"
                        color="primary"
                      >
                        <RemoveIcon sx={{ fontSize: 20 }} />
                      </LoadingButton>
                      <Box
                        sx={{
                          mx: 1.5,
                          fontWeight: "600",
                          minWidth: "24px",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </Box>
                      <LoadingButton
                        loading={
                          status.loading && status.id === "add" + item.productId
                        }
                        onClick={() =>
                          handleAddItem(item.productId, "add" + item.productId)
                        }
                        size="small"
                        color="primary"
                      >
                        <AddIcon sx={{ fontSize: 20 }} />
                      </LoadingButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {currencyTRY.format(item.price * item.quantity)}
                  </TableCell>
                  <TableCell align="right">
                    <LoadingButton
                      loading={
                        status.loading &&
                        status.id === "del_all" + item.productId
                      }
                      onClick={() => {
                        handleDeleteItem(
                          item.productId,
                          "del_all" + item.productId,
                          item.quantity,
                        );
                        toast.error("Ürün sepetinizden silindi.");
                      }}
                      color="error"
                    >
                      <Delete />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        flex={1}
        sx={{
          position: "sticky",
          top: 20,
          minWidth: 280,
        }}
      >
        <CartSummary />
      </Box>
    </Box>
  );
}
